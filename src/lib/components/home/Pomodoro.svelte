<script lang="ts">
    import { Icons } from "../../../assets/icons";
    import IconButton from "../IconButton.svelte";
    import { pomodoroState } from "../../store/pomodoro";
    import { settingsState } from "../../store/settings";
    import { Timer, TimerFinishEvent, TimerTickEvent } from "../../core/timer";
    import { TaskType } from "../../types";

    export let radius: number;
    export let stroke: number;

    let finished = true;
    let paused = true;
    let timerDuration: number = 0;
    let timerElapsed: number = 0;

    $: disableToggler =
        (finished && $pomodoroState.tasks.length == 0) ||
        (!finished && !$pomodoroState.tasks[0].pausable);

    // TODO: add reset event to timer

    function handleTimerTick(e: Event) {
        timerElapsed = (e as TimerTickEvent).detail.elapsed;
    }

    function handleTimerFinish() {
        $pomodoroState.tasks.shift();
        $pomodoroState = $pomodoroState;

        if ($pomodoroState.tasks.length == 0) {
            finished = true;
            paused = true;
            timer.reset();
            timerDuration = timer.duration;
            return;
        }

        timer.reset();
        timer.duration = $pomodoroState.tasks[0].duration;
        timerDuration = timer.duration;

        switch ($pomodoroState.tasks[0].typ) {
            case TaskType.WORK:
                $settingsState.autoStartSession ?? timer.start();
                break;
            case TaskType.BREAK:
                $settingsState.autoStartBreak ?? timer.start();
                break;
        }
    }

    let timer = new Timer(1 * 1000);
    timer.addEventListener(TimerTickEvent.type, handleTimerTick);
    timer.addEventListener(TimerFinishEvent.type, handleTimerFinish);

    function toggleSession() {
        if (finished && $pomodoroState.tasks.length > 0) {
            timer.duration = $pomodoroState.tasks[0].duration;
            timerDuration = timer.duration;
            finished = false;
            paused = false;
            timer.start();
            return;
        }

        if (paused) {
            timer.start();
            paused = false;
            return;
        }

        if ($pomodoroState.tasks[0].pausable) {
            timer.pause();
            paused = true;
        }
    }

    function cancelTask() {
        paused = true;
        timer.reset();
        timer.duration = $pomodoroState.tasks[0].duration;
        timerDuration = timer.duration;
    }

    $: normalizedRadius = radius - stroke * 2;
    $: circumference = normalizedRadius * 2 * Math.PI;
    $: strokeDashOffset =
        timerDuration > 0
            ? circumference -
              (((timerElapsed / timerDuration) * 100) / 100) * circumference
            : 0;

    function getDisplayTime(ms: number) {
        if (timerDuration == 0 || ms <= 0) {
            return "--";
        }

        // get hours from minutes
        const hours = ms / (60 * 60 * 1000);
        const absoluteHours = Math.floor(hours);
        const h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

        // get remainder from hours and convert to minutes
        const minutes = (hours - absoluteHours) * 60;
        const absoluteMinutes = Math.floor(minutes);
        const m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

        const seconds = (minutes - absoluteMinutes) * 60;
        const absoluteSeconds = Math.floor(seconds);
        const s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

        return (
            (h === "00" ? "" : h + "h ") +
            (m === "00" ? "" : m + "m ") +
            (s === "00" ? "" : s + "s ")
        );
    }

    // remove the trailing milliseconds which are not required to display
    $: fixedElapsed = Math.floor(timerElapsed / 100) * 100;
    $: display = getDisplayTime(timerDuration - fixedElapsed);
</script>

<div class="flex items-center justify-center flex-col gap-8 w-full h-full">
    <div class="relative">
        <svg
            style="width: {radius * 2}vh; height: {radius * 2}vh;"
            class="-rotate-90 bg-zinc-300 dark:bg-zinc-700 rounded-full">
            <circle
                class="transition-all cubic-bezier(1, 0, 0, 1) duration-300 stroke-blue-400"
                style="stroke-dashoffset: {strokeDashOffset}vh;
                fill: transparent;
                stroke-dasharray: {circumference + 'vh ' + circumference}vh;
                stroke-width: {stroke}vh;
                stroke-linecap: round"
                r="{normalizedRadius}vh"
                cx="50%"
                cy="50%" />
        </svg>
        <p
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-700 dark:text-gray-300">
            {display}
        </p>
    </div>
    <div class="flex items-center gap-8">
        <IconButton
            disabled={disableToggler}
            on:click={toggleSession}
            icon={paused ? Icons.play : Icons.pause} />
        <IconButton
            on:click={cancelTask}
            icon={Icons.cancel} />
    </div>
</div>
