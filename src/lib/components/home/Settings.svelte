<script lang="ts">
    import { appState } from "../../store/app";
    import { settingsState } from "../../store/settings";
    import Modal from "../Modal.svelte";
    import NumberInput from "../NumberInput.svelte";
    import ToggleButton from "../ToggleButton.svelte";
</script>

<Modal open={$appState.windows.settingsOpen}>
    <div
        class="w-full h-full overflow-auto p-4 flex flex-col items-center justify-start">
        <div class="w-full flex flex-col items-start justify-start mb-4 mt-4">
            <h2 class="text-lg text-gray-700 dark:text-gray-400 mb-2">
                break duration
            </h2>
            <div class="w-full">
                <NumberInput
                    name="minutes"
                    bind:value={$settingsState.breakDuration}
                    example={25}
                    classes="w-full" />
            </div>
        </div>
        <div class="w-full flex flex-col items-start justify-start mb-4 mt-4">
            <h2 class="text-lg text-gray-700 dark:text-gray-400 mb-2">
                more settings
            </h2>
            <div class="w-full flex flex-col items-center justify-start gap-4">
                <ToggleButton
                    description="auto start next session"
                    bind:value={$settingsState.autoStartSession} />
                <ToggleButton
                    description="auto start next break"
                    bind:value={$settingsState.autoStartBreak} />
                <ToggleButton
                    description="enable dark theme"
                    bind:value={$settingsState.darkTheme} />
            </div>
        </div>
    </div>
</Modal>
