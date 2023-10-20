<script lang="ts">
    import { taskTypes, type Task } from "../../core/session";
    import { appState } from "../../store/app";
    import type { Duration } from "../../types";
    import Modal from "../Modal.svelte";
    import NumberInput from "../NumberInput.svelte";
    import Select from "../Select.svelte";
    import TextInput from "../TextInput.svelte";

    let taskDuration: Duration;

    let newTask: Task = {
        typ: "work",
        category: "",
        duration: 0,
        priority: "medium",
        pausable: false,
    };

    function addTask() {
        $appState.tasks.push(newTask);
    }
</script>

<Modal open={$appState.windows.newTaskModalOpen}>
    <div class="w-full flex flex-col items-center justify-start">
        <div class="w-full flex flex-col items-center justify-between">
            <div class="w-full flex items-center gap-2">
                <Select
                    name="task type"
                    options={taskTypes}
                    bind:value={newTask.typ}
                    display={(o) => o} />
                <TextInput
                    name="task category"
                    bind:value={newTask.category}
                    example="studying" />
            </div>
            <div class="w-full flex items-center gap-2">
                <NumberInput
                    name="hours"
                    bind:value={taskDuration.hours}
                    example={2}
                    classes="w-20 md:w-24 lg:w-28" />
                <NumberInput
                    name="minutes"
                    bind:value={taskDuration.minutes}
                    example={25}
                    classes="w-20 md:w-24 lg:w-28" />
                <NumberInput
                    name="seconds"
                    bind:value={taskDuration.seconds}
                    example={10}
                    classes="w-20 md:w-24 lg:w-28" />
            </div>
        </div>
    </div>
</Modal>
