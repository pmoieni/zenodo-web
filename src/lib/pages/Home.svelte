<script lang="ts">
    import Pomodoro from "../components/home/Pomodoro.svelte";
    import { appState } from "../store/app";
    import Settings from "../components/home/Settings.svelte";
    import { Icons } from "../../assets/icons";
    import Page from "../components/Page.svelte";
    import IconButton from "../components/IconButton.svelte";
    import Tasks from "../components/home/Tasks.svelte";

    function openSettings() {
        $appState.windows.settingsOpen = true;
    }
</script>

<Page class="flex flex-col items-center justify-between">
    <div class="w-full h-full flex flex-row items-center justify-between">
        <Pomodoro
            radius={20}
            stroke={2} />
        <Tasks />
    </div>
    <div class="w-full p-4 flex items-center justify-between">
        <IconButton
            on:click={openSettings}
            icon={Icons.settings} />
    </div>
    <Settings />
</Page>
