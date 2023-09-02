<script lang="ts">
    import { writable } from "svelte/store";
    import { type State, Timer, type StateManager } from "./lib/ticker";

    const state = writable<State>();

    function getState(): State {
        return $state;
    }

    function setState(value: State): void {
        return state.set(value);
    }

    const sm: StateManager = {
        get: getState,
        set: setState,
    };

    let elapsed = 0;

    const ticker = new Timer(
        sm,
        5000,
        1000,
        () => console.log("finished"),
        () => console.log("callback")
    );

    ticker.start();
</script>

<main>
    <h1>elapsed: {elapsed}</h1>
</main>

<style>
</style>
