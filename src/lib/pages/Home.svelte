<script lang="ts">
    import Pomodoro from "../components/home/Pomodoro.svelte";
    import { appState } from "../store/app";
    import Settings from "../components/home/Settings.svelte";
    import Page from "../components/Page.svelte";
    import Tasks from "../components/home/Tasks.svelte";
    import CogIcon from "../components/icons/CogIcon.svelte";
    import { getModal } from "../components/Modal.svelte";

    function openTasks() {
        $appState.windows.tasks = true;
        $appState = $appState;
    }
</script>

<Page class="flex flex-col items-center justify-between">
    <div
        class="w-full h-full flex flex-col md:flex-row items-center justify-between">
        <Pomodoro />
        <Tasks />
    </div>
    <div class="w-full p-4 flex items-center justify-between">
        <button
            class="btn btn-circle"
            on:click={getModal("SettingsModal")?.open}>
            <CogIcon />
        </button>
        <button
            class="btn md:hidden"
            on:click={openTasks}>
            <CogIcon />
            Tasks
        </button>
    </div>
    <Settings />
</Page>
