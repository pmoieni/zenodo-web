<script lang="ts">
    interface ModalAction {
        name: string;
        func?: () => void;
        disabled?: boolean;
        isPrimary: boolean;
    }

    export let open: boolean = false;
    export let actions: ModalAction[] = [];
</script>

<dialog
    class:modal-open={open}
    class="modal modal-bottom md:modal-middle">
    <div class="modal-box">
        <slot />
        <div class="modal-action">
            <form method="dialog">
                {#each actions as action}
                    <button
                        disabled={action.disabled}
                        class="btn {action.isPrimary ? 'btn-primary' : ''}"
                        on:click={action.func}>{action.name}</button>
                {/each}
                <button
                    class="btn"
                    on:click={() => (open = false)}>Close</button>
            </form>
        </div>
    </div>
</dialog>
