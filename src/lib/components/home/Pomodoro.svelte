<script lang="ts">
    import { Icons } from "../../../assets/icons";
    import IconButton from "../IconButton.svelte";
    import { taskQueue } from "../../store/pomodoro";
    import { settingsState } from "../../store/settings";
    import { TimerFinishEvent, TimerTickEvent } from "../../core/timer";
    import { TaskType } from "../../types";

    export let radius: number;
    export let stroke: number;

    let paused = true;
    let timerElapsed = 0;

    $: disableToggler =
        $taskQueue.length == 0 || (!paused && !$taskQueue[0].pausable);

    $: normalizedRadius = radius - stroke * 2;
    $: circumference = normalizedRadius * 2 * Math.PI;
    let strokeDashOffset = 0;

    function handleTimerTick(e: Event) {
        const timerEvent = e as TimerTickEvent;
        timerElapsed = timerEvent.detail.elapsed;
        strokeDashOffset =
            circumference -
            (((timerEvent.detail.elapsed / $taskQueue[0].duration) * 100) /
                100) *
                circumference;
    }

    function handleTimerFinish() {
        $taskQueue[0].timer.removeEventListener(
            TimerTickEvent.type,
            handleTimerTick,
            false
        );
        $taskQueue[0].timer.removeEventListener(
            TimerFinishEvent.type,
            handleTimerFinish,
            false
        );

        $taskQueue.shift();
        $taskQueue = $taskQueue;

        if ($taskQueue.length == 0) {
            paused = true;
            return;
        }

        $taskQueue[0].timer.addEventListener(
            TimerTickEvent.type,
            handleTimerTick
        );
        $taskQueue[0].timer.addEventListener(
            TimerFinishEvent.type,
            handleTimerFinish
        );

        switch ($taskQueue[0].type) {
            case TaskType.WORK:
                $settingsState.autoStartSession ?? $taskQueue[0].timer.start();
                break;
            case TaskType.BREAK:
                $settingsState.autoStartBreak ?? $taskQueue[0].timer.start();
                break;
        }
    }

    function toggleSession() {
        if (paused && $taskQueue.length > 0) {
            paused = false;
            if (!$taskQueue[0].timer.isStarted()) {
                $taskQueue[0].timer.addEventListener(
                    TimerTickEvent.type,
                    handleTimerTick
                );
                $taskQueue[0].timer.addEventListener(
                    TimerFinishEvent.type,
                    handleTimerFinish
                );
            }

            $taskQueue[0].timer.start();
            return;
        }

        if (!paused && $taskQueue[0].pausable) {
            paused = true;
            $taskQueue[0].timer.pause();
        }
    }

    function cancelTask() {
        paused = true;
        $taskQueue[0].timer.reset();
    }

    function getDisplayTime(ms: number) {
        if (ms <= 0) {
            return "--";
        }

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
    $: display =
        $taskQueue.length == 0
            ? "--"
            : getDisplayTime($taskQueue[0].duration - fixedElapsed);
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
