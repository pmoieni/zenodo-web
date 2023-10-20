<script lang="ts">
    import TextButton from "./TextButton.svelte";

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
            class="w-full h-full md:w-auto md:h-auto md:max-w-[80%] md:max-h-[80%] flex flex-col items-center bg-zinc-200 dark:bg-zinc-800 md:rounded-lg overflow-hidden">
            <div class="w-full h-full overflow-auto">
                <slot />
            </div>
            <div class="p-2 w-full">
                <TextButton
                    class="w-full"
                    on:click={close}
                    text="Close" />
            </div>
        </div>
    </button>
{/if}
