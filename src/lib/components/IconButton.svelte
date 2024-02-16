<script lang="ts">
    import Icon from "./Icon.svelte";

    export let icon: string;
    export let disabled: boolean = false;
</script>

<button
    class="p-4 drop-shadow-sm transition-all duration-300 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 rounded-full {disabled
        ? 'hover:bg-zinc-300 dark:hover:bg-zinc-700'
        : ''}"
    {disabled}
    on:click>
    <Icon src={icon} />
</button>
