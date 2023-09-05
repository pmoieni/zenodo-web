<script lang="ts">
    export let open = false;

    function close() {
        open = false;
    }
</script>

{#if open}
    <button
        on:click|self={close}
        class="w-full h-full border-none outline-none flex items-center justify-center bg-zinc-700 bg-opacity-30 absolute top-0 left-0">
        <div
            class="w-full h-full md:w-auto md:h-auto flex flex-col items-center bg-zinc-200 dark:bg-zinc-800 md:rounded-md">
            <div class="w-full h-full overflow-auto">
                <slot />
            </div>
            <button
                on:click={close}
                class="w-full h-16 bg-zinc-300 dark:bg-zinc-700 text-gray-700 dark:text-gray-300"
                >Close</button>
        </div>
    </button>
{/if}
