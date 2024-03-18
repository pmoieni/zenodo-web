<script lang="ts">
    export let name: string;
    export let options: any[] = [];
    export let display = (o: any) => o;
    export let value: any;
</script>

<label class="form-control w-full max-w-xs">
    <div class="label">
        <span class="label-text">{name}</span>
    </div>
    <select
        on:change
        bind:value
        class="select select-bordered">
        <option
            disabled
            selected>Select {name}</option>
        {#each options as opt}
            <option value={opt}>{display(opt)}</option>
        {/each}
    </select>
</label>
