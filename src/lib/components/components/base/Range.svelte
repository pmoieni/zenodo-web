<script lang="ts">
    export let title: string = "";
    export let min: number;
    export let max: number;
    export let step: number;
    export let value: number;
    // explicitly set value to min to enforce value update
    value = min;
    export let labelSuffix = "";

    let stepCount: number;
    $: stepCount = (max - min) / step + 1;
</script>

<div class="label">
    <span class="label-text">{title}</span>
</div>
<input
    class="range"
    type="range"
    {min}
    {max}
    {step}
    on:change
    bind:value />
<div class="w-full flex justify-between text-xs px-2">
    <!-- Array(stepCount) can also be used -->
    <!-- svelte #each can iterate over any object with `length` property -->
    {#each { length: stepCount } as _, idx}
        <span>{min + step * idx + labelSuffix}</span>
    {/each}
</div>
