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
        <slot />
    </button>
{/if}
