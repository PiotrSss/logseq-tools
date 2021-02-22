<script>
    import { createEventDispatcher } from "svelte"

    const options = ['af', 'ar-DZ', 'ar-MA', 'ar-SA', 'ar', 'az', 'be', 'bg', 'bn', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'eo', 'es', 'et', 'eu', 'fa-IR', 'fi', 'fil', 'fr-CA', 'fr-CH', 'fr', 'gd', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'ka', 'kk', 'kn', 'ko', 'lb', 'lt', 'lv', 'mk', 'ms', 'mt', 'nb', 'nl-BE', 'nl', 'nn', 'pl', 'pt-BR', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr-Latn', 'sr', 'sv', 'ta', 'te', 'th', 'tr', 'ug', 'uk', 'uz', 'vi', 'zh-CN', 'zh-TW']
    
    const dispatch = createEventDispatcher()
    export let locale
    $: dispatch("localeChange", { locale })
</script>


<div class="row g-2 align-items-center">
    <div class="col-auto">
        <label for="year" class="col-form-label">Locale for month and day name:</label>
    </div>
    <div class="col-auto">
        <select class="form-select" bind:value={locale}>
            {#each options as option, i}
                <option value={option} selected={locale === option ? true : false}>
                    {option}
                </option>
            {/each}
        </select>
    </div>
</div>