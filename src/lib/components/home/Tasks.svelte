<script lang="ts">
    import { taskQueue } from "../../store/pomodoro";
    import { getModal } from "../Modal.svelte";
    import PlusIcon from "../icons/PlusIcon.svelte";
    import TaskIcon from "../icons/TaskIcon.svelte";
    import NewTask from "./NewTask.svelte";
</script>

<div class="dropdown dropdown-top dropdown-end">
    <div
        tabindex="0"
        role="button"
        class="btn btn-primary">
        <TaskIcon />
        Tasks
    </div>
    <div
        class="dropdown-content mb-2 z-[1] flex flex-col bg-base-200 p-4 min-w-24 rounded-xl drop-shadow-sm">
        {#if $taskQueue.length == 0}
            <div class="w-10 h-10">
                <p>No task available</p>
            </div>
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
            class="btn btn-primary"
            on:click={getModal("NewTaskModal")?.open}>
            <PlusIcon />
            New Task
        </button>
    </div>
</div>
<NewTask />
