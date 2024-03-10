<script lang="ts">
    let classes: string;
    export { classes as class };
</script>

<div class="w-full h-full bg-base-100 {classes}">
    <slot />
</div>
