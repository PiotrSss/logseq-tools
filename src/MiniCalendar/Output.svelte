<script>

    import { createEventDispatcher } from "svelte"

    export let calendarHtml

    const dispatch = createEventDispatcher()
    let copied = false
    const copy = () => {
        dispatch("click")
        copied = true
        setTimeout(() => { copied = false }, 4000)
    }

</script>

<div class="d-grid gap-2 mini-calendar-output-wrapper py-4 px-4">
            
    <button type="button" class="btn btn-info mb-3" on:click={copy}>
        {#if copied}
            <span>🎉 Copied! Now you can paste it somewhere in your Logseq</span>
        {:else}
            <span>Click here to copy generated output to clipboard</span>
        {/if}
    </button>

    <div class="output">{@html calendarHtml}</div>

</div>

<style>
    .mini-calendar-output-wrapper {
        /* border: 1px solid #f7f7f7; */
        background: #f7f7f7;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>