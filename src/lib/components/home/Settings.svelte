<script lang="ts">
    import { appState } from "../../store/app";
    import { settingsState } from "../../store/settings";
    import Modal from "../Modal.svelte";
    import NumberInput from "./settings/NumberInput.svelte";
    import Select from "./settings/Select.svelte";
    import ToggleButton from "./settings/ToggleButton.svelte";
</script>

<Modal open={$appState.settingsOpen}>
    <div
        class="p-4 rounded-md bg-zinc-200 dark:bg-zinc-800 flex flex-col items-center justify-start">
        <div class="w-full flex flex-col items-start justify-start">
            <h1
                class="font-bold text-2xl text-gray-800 dark:text-gray-200 mt-4 mb-4">
                Session
            </h1>
            <div class="flex flex-col items-start justify-start mb-4 mt-4">
                <h2 class="text-lg text-gray-700 dark:text-gray-400 mb-2">
                    session duration
                </h2>
                <div class="w-full flex items-center justify-start gap-4">
                    <NumberInput
                        name="hours"
                        bind:value={$settingsState.sessionDuration.hours}
                        example={2}
                        classes="w-16 md:w-20 lg:w-24" />
                    <NumberInput
                        name="minutes"
                        bind:value={$settingsState.sessionDuration.minutes}
                        example={25}
                        classes="w-16 md:w-20 lg:w-24" />
                    <NumberInput
                        name="seconds"
                        bind:value={$settingsState.sessionDuration.seconds}
                        example={10}
                        classes="w-16 md:w-20 lg:w-24" />
                </div>
            </div>
        </div>
        <div class="w-full flex flex-col items-start justify-start mb-4 mt-4">
            <h2 class="text-lg text-gray-700 dark:text-gray-400 mb-2">
                break duration
            </h2>
            <div class="w-full flex items-center justify-start gap-4">
                <NumberInput
                    name="hours"
                    bind:value={$settingsState.breakDuration.hours}
                    example={2}
                    classes="w-16 md:w-20 lg:w-24" />
                <NumberInput
                    name="minutes"
                    bind:value={$settingsState.breakDuration.minutes}
                    example={25}
                    classes="w-16 md:w-20 lg:w-24" />
                <NumberInput
                    name="seconds"
                    bind:value={$settingsState.breakDuration.seconds}
                    example={10}
                    classes="w-16 md:w-20 lg:w-24" />
            </div>
        </div>
        <div class="w-full flex flex-col items-start justify-start mb-4 mt-4">
            <h2 class="text-lg text-gray-700 dark:text-gray-400 mb-2">
                session count
            </h2>
            <div class="w-full flex items-center justify-start">
                <Select
                    name="count"
                    options={[3, 5, 10]}
                    bind:value={$settingsState.sessionCount}
                    classes="w-16 md:w-20 lg:w-24" />
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
