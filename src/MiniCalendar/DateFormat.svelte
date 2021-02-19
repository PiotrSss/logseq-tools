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

<input bind:value={dateFormat} />
<p>Preview: {@html dateFormatPreview}</p>