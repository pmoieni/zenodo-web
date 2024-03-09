<script lang="ts">
    import { appState } from "../../store/app";
    import { taskQueue } from "../../store/pomodoro";
    import TextButton from "../TextButton.svelte";
    import NewTask from "./NewTask.svelte";
    import TaskCard from "./TaskCard.svelte";

    function openNewTaskModal() {
        $appState.windows.newTaskModalOpen = true;
    }
</script>

<div class="p-2 w-3/5 h-full flex flex-col gap-2">
    <ul
        class="p-2 bg-zinc-300 dark:bg-zinc-700 rounded-lg gap-2 flex flex-col items-center">
        {#if $taskQueue.length == 0}
            <p class="text-gray-900 dark:text-gray-300">No task available</p>
        {:else}
            {#each $taskQueue as task}
                <TaskCard {task} />
            {/each}
        {/if}
    </ul>
    <TextButton
        text="+ New task"
        on:click={openNewTaskModal} />
</div>
<NewTask />
