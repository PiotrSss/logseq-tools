<script>
    import { copyToClipboard } from '../helpers.ts'

    const calendarCss = `
.cp__sidebar-main-content .logseq-tools-multiple-calendars {
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
}

.cp__sidebar-main-content .logseq-tools-multiple-calendars .logseq-tools-calendar {
    flex: 0 50%;
    box-sizing: border-box;
    padding: 0 15px;
}

.logseq-tools-calendar tr {
    background: none !important;
}

.logseq-tools-calendar th,
.logseq-tools-calendar td,
.logseq-tools-calendar tr {
    border: none;
}

.logseq-tools-calendar th,
.logseq-tools-calendar td {
    text-align: center;
}


/* Calendar - pages from other months */

.logseq-tools-calendar .outofmonth {
    opacity: .3;
}
    `

    let copied = false
    const copy = () => {
        copyToClipboard(calendarCss)
        copied = true
        setTimeout(() => { copied = false }, 4000)
    }
</script>

<p>To make your calendar prettier, add this to your css file:</p>
<div class="css-to-copy d-grid gap-1">
    <button type="button" class="btn btn-info mb-3" on:click={copy}>
        {#if copied}
            <span>🎉 Copied! Now you can paste it to your css file</span>
        {:else}
            <span>Click here to copy this to clipboard</span>
        {/if}
    </button>
    <pre>
        {calendarCss}
    </pre>
</div>


<style>
    .css-to-copy {
        background: #f7f7f7;
        border-radius: 5px;
        padding: 20px 20px 10px 20px;
    }
    .css-to-copy pre {
        height: 150px;
    }
</style>