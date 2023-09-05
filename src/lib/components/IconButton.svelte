<script lang="ts">
    import Icon from "./Icon.svelte";

    export let icon: string;
</script>

<button
    class="p-4 transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-full"
    on:click>
    <Icon src={icon} />
</button>
