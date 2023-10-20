<script lang="ts">
    export let description: string;
    export let value: boolean;
</script>

<div class="w-full flex items-center justify-between gap-4">
    <p class="text-sm text-gray-500">{description}</p>
    <label class="flex items-center cursor-pointer">
        <div class="relative">
            <input
                bind:checked={value}
                type="checkbox"
                class="sr-only" />
            <div
                class="block bg-zinc-50 dark:bg-zinc-900 w-14 h-8 rounded-full drop-shadow-sm">
            </div>
            <div
                class="dot absolute left-1 top-1 bg-zinc-500 w-6 h-6 rounded-full transition drop-shadow-sm">
            </div>
        </div>
    </label>
</div>

<style lang="postcss">
    input:checked ~ .dot {
        transform: translateX(100%);
        background-color: theme("colors.blue.400");
    }
</style>
