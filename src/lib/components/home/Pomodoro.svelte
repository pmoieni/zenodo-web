<script lang="ts">
    import { taskQueue } from "../../store/pomodoro";
    import { settingsState } from "../../store/settings";
    import { TimerFinishEvent, TimerTickEvent } from "../../core/timer";
    import { TaskType } from "../../types";
    import PlayIcon from "../icons/PlayIcon.svelte";
    import CancelIcon from "../icons/CancelIcon.svelte";
    import PauseIcon from "../icons/PauseIcon.svelte";

    let paused = true;
    let timerElapsed = 0;
    $: timerProgress = $taskQueue[0]
        ? (timerElapsed / $taskQueue[0].duration) * 100
        : 0;

    $: notPausable =
        $taskQueue.length == 0 || (!paused && !$taskQueue[0].pausable);

    function handleTimerTick(e: Event) {
        const timerEvent = e as TimerTickEvent;
        timerElapsed = timerEvent.detail.elapsed;
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
            $taskQueue[0].timer.pause();
            paused = true;
        }
    }

    function cancelTask() {
        paused = true;
        $taskQueue[0].timer.reset();
    }

    function getDisplayTime(ms: number) {
        const hours = ms / (60 * 60 * 1000);
        const absoluteHours = Math.floor(hours);

        const minutes = (hours - absoluteHours) * 60;
        const absoluteMinutes = Math.floor(minutes);

        const seconds = (minutes - absoluteMinutes) * 60;
        const absoluteSeconds = Math.floor(seconds);

        return {
            hours: absoluteHours,
            minutes: absoluteMinutes,
            seconds: absoluteSeconds,
        };
    }

    // remove the trailing milliseconds which are not required to display
    $: displayTime =
        $taskQueue.length > 0
            ? getDisplayTime($taskQueue[0].duration - timerElapsed)
            : null;
</script>

<div class="flex items-center justify-center flex-col gap-8 w-full h-full">
    <div
        class="radial-progress bg-primary text-primary-content border-8 border-primary"
        style="--value: {timerProgress}; --size: 15rem; --thickness: {timerProgress ==
        0
            ? '0'
            : '1'}rem;"
        role="progressbar">
        {#if displayTime}
            <span class="countdown font-mono text-2xl">
                <span style="--value:{displayTime.hours};"></span>h
                <span style="--value:{displayTime.minutes};"></span>m
                <span style="--value:{displayTime.seconds};"></span>s
            </span>
        {:else}
            <p>--</p>
        {/if}
    </div>
    <div class="flex items-center gap-8">
        <button
            class="btn btn-circle"
            disabled={notPausable}
            on:click={toggleSession}>
            {#if paused}
                <PlayIcon />
            {:else}
                <PauseIcon />
            {/if}
        </button>
        <button
            class="btn btn-circle"
            on:click={cancelTask}>
            <CancelIcon />
        </button>
    </div>
</div>
