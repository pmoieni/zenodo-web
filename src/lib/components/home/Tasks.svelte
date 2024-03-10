<script lang="ts">
    import { appState } from "../../store/app";
    import { taskQueue } from "../../store/pomodoro";
    import PlusIcon from "../icons/PlusIcon.svelte";
    import NewTask from "./NewTask.svelte";

    function openNewTaskModal() {
        $appState.windows.newTaskModalOpen = true;
    }
</script>

<div
    class="p-4 bg-base-300 transition-all fixed {!$appState.windows.tasks
        ? 'hidden'
        : 'block'} w-full h-full flex flex-col md:block md:static md:top-0 md:w-3/5">
    <div class="w-full h-full flex items-start justify-center">
        {#if $taskQueue.length == 0}
            <p class="text-2xl h-full flex items-center justify-center">
                No task available
            </p>
        {:else}
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $taskQueue as task, idx}
                        <tr>
                            <th>{idx + 1}</th>
                            <td>{task.title}</td>
                            <td>{task.type}</td>
                            <td>{task.duration / (60 * 1000)}m</td>
                            <td
                                ><div class="badge">
                                    {task.priority}
                                </div></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
    <button
        class="btn btn-primary"
        on:click={openNewTaskModal}>
        <PlusIcon />
        New Task
    </button>
    <button
        class="btn md:hidden"
        on:click={() => ($appState.windows.tasks = false)}>
        Close
    </button>
</div>
<NewTask />
