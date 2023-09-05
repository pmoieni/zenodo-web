<script lang="ts">
    let classes: string;
    export { classes as class };
</script>

<div class="w-full h-full bg-zinc-200 dark:bg-zinc-800 {classes}">
    <slot />
</div>
