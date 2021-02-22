<script>
    import { createEventDispatcher } from "svelte"
    import { format } from 'date-fns'

    const dispatch = createEventDispatcher()

    export let dateFormat
    let dateFormatPreview = format(new Date(), dateFormat)
    $: if (dateFormat.length >= 2) {
        try {
            dateFormatPreview = format(new Date(), dateFormat)
            dispatch('dateFormatChange', { dateFormat })
        } catch(error) {
            dateFormatPreview = `<span class="validation-error">${error.message}</span>`
        }
    } else {
        dateFormatPreview = `<span class="validation-error">This is not a valid format, add more characters</span>`
    }

</script>

<div class="row g-2 align-items-center">
    <div class="col-auto">
        <label for="date-format" class="col-form-label">Daily note title format</label>
    </div>
    <div class="col-auto">
        <input class="form-control" id="date-format" bind:value={dateFormat} />
    </div>
    <div class="col-auto">
        <span class="form-text">Preview: {@html dateFormatPreview}</span>
    </div>
</div>

