<script lang="ts">
    import { appState } from "../../store/app";
    import { pomodoroState } from "../../store/pomodoro";
    import { TaskType, TaskPriority, type Task } from "../../types";
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

    let newTask: Task = {
        title: "",
        typ: TaskType.WORK,
        duration: 0,
        priority: TaskPriority.MEDIUM,
        pausable: true,
    };

    function addTask() {
        $pomodoroState.tasks.push({
            ...newTask,
            duration: newTask.duration * 60 * 1000,
        });

        // why? because svelte is stupid
        $pomodoroState = $pomodoroState;

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
                    bind:value={newTask.title}
                    example="watch movie" />
            </div>
            <div class="w-full flex items-center gap-2">
                <Select
                    name="task type"
                    options={Object.keys(taskTypes)}
                    bind:value={newTask.typ}
                    display={(o) => o} />
                <Select
                    name="task priority"
                    options={Object.keys(taskPriorities)}
                    bind:value={newTask.priority}
                    display={(o) => o} />
            </div>
            <div class="w-full">
                <NumberInput
                    name="minutes"
                    bind:value={newTask.duration}
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
