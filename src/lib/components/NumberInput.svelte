<script lang="ts">
    export let name: string;
    export let value: number;
    export let example: number;
    export let classes: string = "";
</script>

<div class="group relative {classes}">
    <label
        for={name}
        class="block w-full pb-1 text-sm text-left font-medium text-gray-500 transition-all duration-300 ease-in-out group-focus-within:text-blue-400"
        >{name}</label>
    <input
        bind:value
        id={name}
        type="number"
        class="peer h-10 w-full rounded-md text-gray-700 dark:text-gray-300 bg-zinc-50 dark:bg-zinc-700 px-4 outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-white dark:focus:bg-zinc-600 focus:ring-2 focus:ring-blue-400" />
    <span
        class="absolute block pt-1 text-xs font-semibold text-gray-500 opacity-0 transition-all duration-200 ease-in-out group-focus-within:opacity-100"
        >example: {example}</span>
</div>
