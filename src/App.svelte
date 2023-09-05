<script lang="ts">
    import Home from "./lib/pages/Home.svelte";
    import { settingsState } from "./lib/store/settings";
</script>

<main class="{$settingsState.darkTheme ? 'dark' : ''} w-screen h-screen">
    <Home />
</main>

<style lang="postcss">
    @font-face {
        font-family: Inter;
        src: url("fonts/Inter-Regular.ttf");
    }

    @font-face {
        font-family: Inter;
        src: url(./assets/fonts/Inter-Light.ttf);
        font-weight: 300;
    }

    @font-face {
        font-family: Inter;
        src: url("fonts/DejaVuSans-Bold.ttf");
        font-weight: bold;
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
