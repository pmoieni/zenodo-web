

<svelte:head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="mask-icon" href="/mask-icon.png" color="#5bbad5" />
    <meta name="theme-color" content="#ffffff" />
</svelte:head>

<main data-theme="{$settingsState.darkTheme" ? "dark" : "light"} class="w-screen h-screen">
    <Home></Home>
</main>


<script>import "./app.css";
import Home from "./lib/pages/Home.svelte";
import { settingsState } from "./lib/store/settings";</script><script>import "./app.css";</script><style></style>