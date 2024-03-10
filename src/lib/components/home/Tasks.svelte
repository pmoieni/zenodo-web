<script lang="ts">
    import { appState } from "../../store/app";
    import { taskQueue } from "../../store/pomodoro";
    import { getModal } from "../Modal.svelte";
    import PlusIcon from "../icons/PlusIcon.svelte";
    import NewTask from "./NewTask.svelte";
</script>

<div
    class="p-4 bg-base-300 transition-all fixed {!$appState.windows.tasks
        ? 'hidden'
        : 'block'} w-full h-full flex flex-col items-center justify-between md:block md:static md:w-3/5 gap-4">
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
    <button
        class="btn btn-primary btn-block"
        on:click={getModal("NewTaskModal")?.open}>
        <PlusIcon />
        New Task
    </button>
    <button
        class="btn btn-block md:hidden"
        on:click={() => ($appState.windows.tasks = false)}>
        Close
    </button>
</div>
<NewTask />
