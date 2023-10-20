<script lang="ts">
    export let text: string;
    let classes = "";
    export { classes as class };
</script>

<button
    class="px-4 py-2 transition-all duration-300 text-gray-700 dark:text-gray-300 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 rounded-lg {classes}"
    on:click>
    <p>{text}</p>
</button>
