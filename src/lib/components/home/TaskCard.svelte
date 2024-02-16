<script lang="ts">
    import { TaskPriority, type Task } from "../../types";

    export let task: Task;
</script>

<div
    class="w-full bg-zinc-200 dark:bg-zinc-600 drop-shadow-sm rounded-lg p-4 flex flex-col gap-4">
    <div class="w-full flex flex-row items-center justify-between">
        <p class="text-lg text-gray-900 dark:text-gray-300">
            {task.title}
        </p>
        <p
            class="px-2 py-1 rounded-lg text-sm font-bold text-gray-900 dark:text-gray-300 {task.priority ===
            TaskPriority.LOW
                ? 'bg-green-400 dark:bg-green-700'
                : task.priority === TaskPriority.MEDIUM
                  ? 'bg-yellow-400 dark:bg-yellow-700'
                  : 'bg-red-400 dark:bg-red-700'}">
            {task.priority}
        </p>
    </div>
    <div class="flex flex-row">
        <p class="py-2 px-4 rounded-lg bg-blue-300 dark:bg-blue-600">
            {task.duration / (60 * 1000)}m
        </p>
    </div>
</div>
