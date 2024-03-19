<script lang="ts">
    import PlayIcon from "../../icons/PlayIcon.svelte";
    import PauseIcon from "../../icons/PauseIcon.svelte";
    import CancelIcon from "../../icons/CancelIcon.svelte";
    import { _isQueueFinished, _queue } from "../../../core/queue";

    $: currentTask = $_isQueueFinished ? null : $_queue[0];
    $: timerProgress = $currentTask
        ? ($currentTask.elapsed / $currentTask.duration) * 100
        : 0;

    function toggleSession() {
        // TODO: fix null check
        if (currentTask && $currentTask) {
            $currentTask.isRunning ? currentTask.pause() : currentTask.start();
        }
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
    $: displayTime = $currentTask
        ? getDisplayTime($currentTask.duration - $currentTask.elapsed)
        : null;
</script>

<div class="flex items-center justify-center flex-col gap-8 w-full h-full">
    <div
        class="radial-progress bg-primary text-2xl text-primary-content border-8 border-primary relative"
        style="--value: {timerProgress}; --size: 15rem; --thickness: {timerProgress ==
        0
            ? '0'
            : '1'}rem;"
        role="progressbar">
        {#if displayTime}
            <span class="countdown font-mono">
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
            disabled={$currentTask &&
                $currentTask.isRunning &&
                !$currentTask.info.pausable}
            on:click={toggleSession}>
            {#if $currentTask && $currentTask.isRunning}
                <PauseIcon />
            {:else}
                <PlayIcon />
            {/if}
        </button>
        <button
            class="btn btn-circle"
            on:click={currentTask && currentTask.cancel}>
            <CancelIcon />
        </button>
    </div>
    {#if $currentTask}
        <table class="table w-full sm:max-w-16">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody>
                {#if $currentTask.info.type === "work"}
                    <tr>
                        <td>{$currentTask.info.title}</td>
                        <td>{$currentTask.info.type}</td>
                        <td>{$currentTask.duration / (60 * 1000)}m</td>
                        <td
                            ><div class="badge">
                                {$currentTask.info.priority}
                            </div></td>
                    </tr>
                {:else}
                    <tr class="bg-secondary text-secondary-content">
                        <td colspan="4"
                            >{$currentTask.duration / (60 * 1000)} minutes of break</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    {/if}
</div>
