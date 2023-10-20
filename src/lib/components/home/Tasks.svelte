<script lang="ts">
    import { appState } from "../../store/app";
    import TextButton from "../TextButton.svelte";
    import NewTask from "./NewTask.svelte";

    function openNewTaskModal() {
        $appState.windows.newTaskModalOpen = true;
    }
</script>

<div class="p-2 w-3/5 h-full flex flex-col gap-2">
    <ul class="p-4 bg-zinc-300 dark:bg-zinc-700 rounded-lg"></ul>
    <TextButton
        text="+ New task"
        on:click={openNewTaskModal} />
</div>
<NewTask />
