<script lang="ts">
    import { getModal } from "../components/components/base/Modal.svelte";
    import Page from "../components/components/base/Page.svelte";
    import Pomodoro from "../components/components/home/Pomodoro.svelte";
    import Settings from "../components/components/home/Settings.svelte";
    import Tasks from "../components/components/home/Tasks.svelte";
    import CogIcon from "../components/icons/CogIcon.svelte";
</script>

<Page class="flex flex-col items-center justify-between">
    <div class="w-full h-full flex items-center justify-center">
        <Pomodoro />
    </div>
    <div class="w-full p-4 flex items-center justify-between">
        <button
            class="btn btn-circle"
            on:click={getModal("SettingsModal")?.open}>
            <CogIcon />
        </button>
        <Tasks />
    </div>
    <Settings />
</Page>
