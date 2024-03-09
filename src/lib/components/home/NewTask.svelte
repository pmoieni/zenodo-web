<script lang="ts">
    import { Timer } from "../../core/timer";
    import { appState } from "../../store/app";
    import { taskQueue } from "../../store/pomodoro";
    import { TaskType, TaskPriority } from "../../types";
    import Modal from "../Modal.svelte";
    import NumberInput from "../NumberInput.svelte";
    import Select from "../Select.svelte";
    import TextButton from "../TextButton.svelte";
    import TextInput from "../TextInput.svelte";

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

    function addTask() {
        $taskQueue.push({
            title,
            type,
            priority,
            pausable,
            duration: duration * 60 * 1000,
            timer: new Timer(duration * 60 * 1000, 1 * 1000),
        });

        $taskQueue = $taskQueue;

        $appState.windows.newTaskModalOpen = false;
        $appState = $appState;
    }
</script>

<Modal open={$appState.windows.newTaskModalOpen}>
    <div class="w-full flex flex-col items-center justify-start">
        <div
            class="p-4 w-full flex flex-col items-center justify-between gap-6">
            <div class="w-full flex items-center gap-2">
                <TextInput
                    name="task title"
                    bind:value={title}
                    example="watch movie" />
            </div>
            <div class="w-full flex items-center gap-2">
                <Select
                    name="task type"
                    options={Object.keys(taskTypes)}
                    bind:value={type}
                    display={(o) => o} />
                <Select
                    name="task priority"
                    options={Object.keys(taskPriorities)}
                    bind:value={priority}
                    display={(o) => o} />
            </div>
            <div class="w-full">
                <NumberInput
                    name="minutes"
                    bind:value={duration}
                    example={30}
                    classes="w-full md:w-24 lg:w-28" />
            </div>
        </div>
        <div class="w-full px-2">
            <TextButton
                on:click={addTask}
                class="w-full"
                text="Add Task" />
        </div>
    </div>
</Modal>
