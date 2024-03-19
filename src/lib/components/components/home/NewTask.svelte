<script lang="ts">
    import {
        _isQueueFinished,
        _queue,
        createTask,
        type TaskPriority,
        type TaskType,
    } from "../../../core/queue";
    import { settingsState } from "../../../store/settings";
    import Modal from "../base/Modal.svelte";
    import Range from "../base/Range.svelte";
    import Select from "../base/Select.svelte";

    const taskTypes: TaskType[] = ["work", "break"];
    const taskPriorities: TaskPriority[] = ["low", "medium", "high"];

    let title = "";
    let type: TaskType = "work";
    let duration = 15;
    let priority: TaskPriority = "medium";
    let pausable = true;
    let cancelable = true;

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

    function resetInput() {
        title = "";
        type = "work";
        duration = 15;
        priority = "medium";
        pausable = true;
        cancelable = true;
    }

    $: currentTask = $_isQueueFinished ? null : $_queue[0];

    function addTask() {
        const onFinish = () => {
            _queue.update((v) => {
                v.shift();
                return v;
            });

            // TODO: fix null check
            if (currentTask && $currentTask) {
                console.log("ran this");
                switch ($currentTask.info.type) {
                    case "work":
                        if ($settingsState.autoStartSession) {
                            console.log("started next session");
                            currentTask.start();
                        }
                        break;
                    case "break":
                        if ($settingsState.autoStartBreak) currentTask.start();
                        break;
                    default:
                        console.log("fuck");
                }
            }
        };

        const task = createTask(
            {
                title,
                type,
                priority,
                pausable,
                cancelable,
            },
            duration * 60 * 1000,
            1 * 1000,
            onFinish
        );

        const taskBreak = createTask(
            {
                type: "break",
                pausable: true,
                cancelable: true,
            },
            5 * 60 * 1000,
            1 * 1000,
            onFinish
        );

        _queue.update((v) => {
            v.push(task, taskBreak);
            return v;
        });

        resetInput();
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
                options={taskTypes}
                bind:value={type}
                display={(o) => o} />
            <Select
                name="Task Priority"
                options={taskPriorities}
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
