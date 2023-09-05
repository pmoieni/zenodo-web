<script lang="ts">
    const sizes = {
        small: "1rem",
        medium: "1.5rem",
        big: "2rem",
    };

    export let src: string;
    let sizeName: "small" | "medium" | "big" = "medium";
    export { sizeName as size };
    $: size = sizes[sizeName];
</script>

{#if src}
    <img
        class="block dark:invert"
        style={`width: ${size};
        height: ${size};
        max-width: ${size};
        max-height: ${size};`}
        {src}
        alt={src} />
{/if}
