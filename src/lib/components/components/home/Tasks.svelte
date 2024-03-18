<script lang="ts">
    import { get } from "svelte/store";
    import { _isQueueFinished, _queue } from "../../../core/queue";
    import PlusIcon from "../../icons/PlusIcon.svelte";
    import TaskIcon from "../../icons/TaskIcon.svelte";
    import { getModal } from "../base/Modal.svelte";
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
        class="dropdown-content mb-2 z-[1] flex flex-col bg-base-200 p-4 rounded-xl drop-shadow-sm gap-4">
        {#if $_isQueueFinished}
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
                    {#each $_queue as task, idx}
                        <!-- TODO: can't use `$` sign here -->
                        <tr>
                            <th>{idx + 1}</th>
                            <td>{get(task).info.title}</td>
                            <td>{get(task).info.type}</td>
                            <td>{get(task).duration / (60 * 1000)}m</td>
                            <td
                                ><div class="badge">
                                    {get(task).info.priority}
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
