<script lang="ts">
    import Home from "./lib/pages/Home.svelte";
    import { settingsState } from "./lib/store/settings";
</script>

<svelte:head>
    <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png" />
    <link
        rel="icon"
        href="/favicon.ico" />
    <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png" />
    <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png" />
    <link
        rel="mask-icon"
        href="/mask-icon.png"
        color="#5bbad5" />
    <meta
        name="theme-color"
        content="#ffffff" />
</svelte:head>

<main class="{$settingsState.darkTheme ? 'dark' : ''} w-screen h-screen">
    <Home />
</main>

<style lang="postcss">
    @font-face {
        font-family: Inter;
        src: url(./assets/fonts/Inter-Regular.ttf);
    }

    @font-face {
        font-family: Inter;
        src: url(./assets/fonts/Inter-Light.ttf);
        font-weight: 300;
    }

    @font-face {
        font-family: Inter;
        src: url(./assets/fonts/Inter-Bold.ttf);
        font-weight: bold;
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
