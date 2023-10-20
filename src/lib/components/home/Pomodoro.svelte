<script lang="ts">
    import { Icons } from "../../../assets/icons";
    import { Timer, TimerTickEvent, type TimerState } from "../../core/timer";
    import { settingsState } from "../../store/settings";
    import { pomodoroState } from "../../store/pomodoro";
    import IconButton from "../IconButton.svelte";
    import { Duration } from "../../types";

    export let radius: number;
    export let stroke: number;

    function onTimerTick(state: TimerState) {
        $pomodoroState.timer = state;
    }

    let duration = $settingsState.sessionDuration.getMilliseconds();

    const timer = new Timer(duration, 1 * 1000);

    timer.addEventListener(TimerTickEvent.type, (event: Event) =>
        onTimerTick((event as TimerTickEvent).detail)
    );

    settingsState.subscribe((v) => {
        duration = v.sessionDuration.getMilliseconds();
        timer.setDuration(duration);
    });

    $: normalizedRadius = radius - stroke * 2;
    $: circumference = normalizedRadius * 2 * Math.PI;
    $: strokeDashOffset =
        circumference -
        ((($pomodoroState.timer.elapsed / duration) * 100) / 100) *
            circumference;

    function toggleTimer() {
        if ($pomodoroState.timer.isRunning) {
            timer.pause();
            return;
        }

        timer.start();
    }

    function resetTimer() {
        timer.reset();
    }

    // remove the trailing milliseconds which are not required to display
    $: fixedElapsed = Math.floor($pomodoroState.timer.elapsed / 100) * 100;
    $: displayTime = Duration.parseMilliseconds(duration - fixedElapsed);
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
            {displayTime}
        </p>
    </div>
    <div class="flex items-center gap-8">
        <IconButton
            on:click={toggleTimer}
            icon={$pomodoroState.timer.isRunning ? Icons.pause : Icons.play} />
        <IconButton
            on:click={resetTimer}
            icon={Icons.stop} />
    </div>
</div>
