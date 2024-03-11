<script lang="ts">
    import { Timer } from "../../core/timer";
    import { taskQueue } from "../../store/pomodoro";
    import { TaskType, TaskPriority } from "../../types";
    import Modal from "../Modal.svelte";
    import Range from "../Range.svelte";
    import Select from "../Select.svelte";

    const taskTypes: Record<TaskType, string> = {
        [TaskType.WORK]: "work",
        [TaskType.BREAK]: "break",
    };

    const taskPriorities: Record<TaskPriority, string> = {
        [TaskPriority.LOW]: "low",
        [TaskPriority.MEDIUM]: "medium",
        [TaskPriority.HIGH]: "high",
    };

    let title = "";
    let type = TaskType.WORK;
    let duration = 0;
    let priority = TaskPriority.MEDIUM;
    let pausable = true;

    let wrongTitleText = "invalid title";
    let disableAddButton = true;

    function validateTitle() {
        const trimmed = title.trim();

        if (!title.trim().length) {
            wrongTitleText = "title is required";
            disableAddButton = true;
            return;
        } else if (trimmed.length > 12) {
            wrongTitleText = "title too long";
            disableAddButton = true;
            return;
        }

        disableAddButton = false;
    }

    function addTask() {
        $taskQueue.push({
            title: title.trim(),
            type,
            priority,
            pausable,
            duration: duration * 60 * 1000,
            timer: new Timer(duration * 60 * 1000, 1 * 1000),
        });

        $taskQueue = $taskQueue;
    }
</script>

<Modal
    id="NewTaskModal"
    actions={[
        {
            name: "Add Task",
            func: addTask,
            disabled: disableAddButton,
            isPrimary: true,
            closeOnCall: true,
        },
    ]}>
    <div class="w-full flex flex-col items-center justify-between gap-6">
        <div class="w-full flex items-center gap-2">
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Task Title</span>
                </div>
                <input
                    type="text"
                    placeholder="Example: study math"
                    bind:value={title}
                    on:input={validateTitle}
                    class="input input-bordered w-full max-w-xs" />
                {#if disableAddButton}
                    <div class="label">
                        <span class="label-text text-error"
                            >{wrongTitleText}</span>
                    </div>
                {/if}
            </label>
        </div>
        <div class="w-full flex items-center gap-2">
            <Select
                name="Task Type"
                options={Object.keys(taskTypes)}
                bind:value={type}
                display={(o) => o} />
            <Select
                name="Task Priority"
                options={Object.keys(taskPriorities)}
                bind:value={priority}
                display={(o) => o} />
        </div>
        <div class="w-full">
            <Range
                title="Task Duration"
                min={15}
                max={150}
                step={15}
                bind:value={duration}
                labelSuffix="m" />
        </div>
    </div>
</Modal>
