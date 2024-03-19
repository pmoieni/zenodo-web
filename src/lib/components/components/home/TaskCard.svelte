<script lang="ts">
    import { type ITask } from "../../../core/queue";

    export let task: ITask;
</script>

<div
    class="w-full bg-zinc-200 dark:bg-zinc-600 drop-shadow-sm rounded-lg p-4 flex flex-col gap-4">
    <div class="w-full flex flex-row items-center justify-between">
        <p class="text-lg text-gray-900 dark:text-gray-300">
            {task.info.title}
        </p>
        <p
            class="px-2 py-1 rounded-lg text-sm font-bold text-gray-900 dark:text-gray-300 {task
                .info.priority === 'low'
                ? 'bg-green-400 dark:bg-green-700'
                : task.info.priority === 'medium'
                  ? 'bg-yellow-400 dark:bg-yellow-700'
                  : 'bg-red-400 dark:bg-red-700'}">
            {task.info.priority}
        </p>
    </div>
    <div class="flex flex-row">
        <p class="py-2 px-4 rounded-lg bg-blue-300 dark:bg-blue-600">
            {task.duration / (60 * 1000)}m
        </p>
    </div>
</div>
