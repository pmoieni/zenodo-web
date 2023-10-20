<script lang="ts">
    export let name: string;
    export let options: any[] = [];
    export let display = (o: any) => o;
    export let value: any;
    export let classes = "";
</script>

<div class="group relative {classes}">
    <label
        for={name}
        class="block w-full pb-1 text-sm text-left font-medium text-gray-500 transition-all duration-300 ease-in-out group-focus-within:text-blue-400"
        >{name}</label>
    <select
        id={name}
        on:change
        bind:value
        class="peer h-10 w-full text-gray-700 dark:text-gray-300 rounded-md bg-zinc-50 dark:bg-zinc-700 px-4 outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-white dark:focus:bg-zinc-600 focus:ring-2 focus:ring-blue-400">
        {#each options as opt}
            <option value={opt}>{display(opt)}</option>
        {/each}
    </select>
</div>
