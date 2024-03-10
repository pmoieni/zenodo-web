<script lang="ts">
    import { settingsState } from "../../store/settings";
    import Modal from "../Modal.svelte";
    import ToggleButton from "../ToggleButton.svelte";
    import { appState } from "../../store/app";
    import Range from "../Range.svelte";
</script>

<Modal open={$appState.windows.settingsOpen}>
    <div class="w-full h-full overflow-auto flex flex-col justify-start gap-4">
        <Range
            title="Break Duration"
            bind:value={$settingsState.breakDuration}
            min={5}
            max={30}
            step={5}
            labelSuffix="m" />
        <div class="w-full flex flex-col items-start justify-start">
            <h2 class="text-lg">more settings</h2>
            <div>
                <div class="label">
                    <span class="label-text">auto start next break</span>
                </div>
                <input
                    type="checkbox"
                    checked={$settingsState.autoStartSession}
                    on:change={() => {
                        $settingsState.autoStartSession =
                            !$settingsState.autoStartSession;
                    }}
                    class="toggle" />
            </div>

            <div>
                <div class="label">
                    <span class="label-text">auto start next break</span>
                </div>
                <input
                    type="checkbox"
                    checked={$settingsState.autoStartBreak}
                    on:change={() => {
                        $settingsState.autoStartBreak =
                            !$settingsState.autoStartBreak;
                    }}
                    class="toggle" />
            </div>
            <div>
                <div class="label">
                    <span class="label-text">enable dark theme</span>
                </div>
                <input
                    type="checkbox"
                    checked={$settingsState.darkTheme}
                    on:change={() => {
                        $settingsState.darkTheme = !$settingsState.darkTheme;
                    }}
                    class="toggle theme-controller" />
            </div>
        </div>
    </div>
</Modal>
