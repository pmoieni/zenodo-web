<script lang="ts">
    import Pomodoro from "../components/home/Pomodoro.svelte";
    import { appState } from "../store/app";
    import Settings from "../components/home/Settings.svelte";
    import Icon from "../components/Icon.svelte";
    import { Icons } from "../../assets/icons";
    import Page from "../components/Page.svelte";
    import IconButton from "../components/IconButton.svelte";

    function openSettings() {
        $appState.settingsOpen = true;
    }
</script>

<Page class="flex flex-col items-center justify-between">
    <Pomodoro
        radius={20}
        stroke={2} />
    <div class="w-full p-4 flex items-center justify-between">
        <IconButton
            on:click={openSettings}
            icon={Icons.settings} />
    </div>
    <Settings />
</Page>
