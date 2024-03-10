<script
    context="module"
    lang="ts">
    interface ModalController {
        open: () => void;
        close: () => void;
    }

    const modals: Map<string, ModalController> = new Map();

    export function getModal(key: string) {
        const modal = modals.get(key);
        return modal;
    }
</script>

<script lang="ts">
    interface ModalAction {
        name: string;
        func?: () => void;
        disabled?: boolean;
        isPrimary: boolean;
    }

    let dialog: HTMLDialogElement;

    export let id: string;
    export let actions: ModalAction[] = [];

    modals.set(id, {
        open() {
            dialog.showModal();
        },
        close() {
            dialog.close();
        },
    });
</script>

<dialog
    {id}
    bind:this={dialog}
    class="modal modal-bottom md:modal-middle">
    <div class="modal-box">
        <slot />
        <div class="modal-action">
            {#each actions as action}
                <button
                    disabled={action.disabled}
                    class="btn {action.isPrimary ? 'btn-primary' : ''}"
                    on:click={action.func}>{action.name}</button>
            {/each}
        </div>
    </div>
    <form
        method="dialog"
        class="modal-backdrop">
        <button>Close</button>
    </form>
</dialog>
