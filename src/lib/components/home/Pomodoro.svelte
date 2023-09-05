<script lang="ts">
    import { Icons } from "../../../assets/icons";
    import { Timer, type TimerState } from "../../core/timer";
    import { settingsState, type Duration } from "../../store/settings";
    import { pomodoroState } from "../../store/pomodoro";
    import IconButton from "../IconButton.svelte";
    import { appState } from "../../store/app";

    export let radius: number;
    export let stroke: number;

    function getMilliseconds(duration: Duration): number {
        return (
            (duration.hours * 60 * 60 +
                duration.minutes * 60 +
                duration.seconds) *
            1000
        );
    }

    function parseMilliseconds(ms: number) {
        if (ms <= 0) {
            return "00s";
        }

        // get hours from milliseconds
        const hours = ms / (1000 * 60 * 60);
        const absoluteHours = Math.floor(hours);
        const h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

        // get remainder from hours and convert to minutes
        const minutes = (hours - absoluteHours) * 60;
        const absoluteMinutes = Math.floor(minutes);
        const m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

        // get remainder from minutes and convert to seconds
        const seconds = (minutes - absoluteMinutes) * 60;
        const absoluteSeconds = Math.floor(seconds);
        const s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

        return (
            (h === "00" ? "" : h + "h ") +
            (m === "00" ? "" : m + "m ") +
            s +
            "s"
        );
    }

    function timerCallback(state: TimerState) {
        $pomodoroState.timer = state;
    }

    let duration = getMilliseconds($settingsState.sessionDuration);

    const timer = new Timer(duration, 1 * 1000, timerCallback);

    settingsState.subscribe((v) => {
        duration = getMilliseconds(v.sessionDuration);
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
    $: displayTime = parseMilliseconds(duration - fixedElapsed);
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
