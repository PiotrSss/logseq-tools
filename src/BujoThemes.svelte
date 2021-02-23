<script>
    import { onMount } from 'svelte'
    import { copyToClipboard, loadCss } from './helpers.ts'
    
    
    let mainCss, lightWhiteCss, lightSepiaCss, darkBlackCss, darkCoffeeCss, lightWhiteDotsCss, lightSepiaDotsCss, darkBlackDotsCss, darkCoffeeDotsCss
    loadCss('bujo-css/main.css', (data) => mainCss = data)
    loadCss('bujo-css/light-white.css', (data) => lightWhiteCss = data)
    loadCss('bujo-css/light-sepia.css', (data) => lightSepiaCss = data)
    loadCss('bujo-css/dark-black.css', (data) => darkBlackCss = data)
    loadCss('bujo-css/dark-coffee.css', (data) => darkCoffeeCss = data)
    loadCss('bujo-css/light-white-dots.css', (data) => lightWhiteDotsCss = data)
    loadCss('bujo-css/light-sepia-dots.css', (data) => lightSepiaDotsCss = data)
    loadCss('bujo-css/dark-black-dots.css', (data) => darkBlackDotsCss = data)
    loadCss('bujo-css/dark-coffee-dots.css', (data) => darkCoffeeDotsCss = data)


    let light = 'white'
    let dark = 'black'
    let lightDots = true
    let darkDots = true
    let offlineOrOnline = 'online'

    let modal, modalEl

    
    onMount(() => {
        modal = new window.bootstrap.Modal(modalEl)
    })

    let modalContent = ''

    const showImage = (img) => {
        modalContent = `<img src="images/logseq-${img}.jpg" alt="White theme">`
        modal.show()
    }

    let css = ''
    const buildCss = () => {
        css = offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/main.css');\n` : mainCss + '\n\n\n'
        switch (dark) {
            case 'black':
                css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/dark-black.css');\n` : darkBlackCss + '\n\n\n'
                darkDots ? css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/dark-black-dots.css');\n` : darkBlackDotsCss + '\n\n\n' : ''
                break;
            case 'coffee':
                css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/dark-coffee.css');\n` : darkCoffeeCss + '\n\n\n'
                darkDots ? css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/dark-coffee-dots.css');\n` : darkCoffeeDotsCss + '\n\n\n' : ''
                break;
        }
        switch (light) {
            case 'white':
                css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/light-white.css');\n` : lightWhiteCss + '\n\n\n'
                lightDots ? css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/light-white-dots.css');\n` : lightWhiteDotsCss + '\n\n\n' : ''
                break;
            case 'sepia':
                css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/light-sepia.css');\n` : lightSepiaCss + '\n\n\n'
                lightDots ? css += offlineOrOnline === 'online' ? `@import url('${location.origin}/bujo-css/light-sepia-dots.css');\n` : lightSepiaDotsCss + '\n\n\n' : ''
                break;
        }        
        return css
    }
    buildCss()

    let copied = false
    const copy = () => {
        copyToClipboard(buildCss())
        copied = true
        setTimeout(() => { copied = false }, 4000)
    }

</script>

<div class="mb-5">

    <h4>Light theme I like the most...</h4>

    <div class="row">
        <div class="col-auto">
            <div class="card" style="width: 22rem;">
                <img src="images/logseq-light-white.jpg" class="card-img-top" alt="White theme" on:click={() => showImage('light-white')}>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="white" id="white" bind:group={light} value={'white'} on:change={buildCss}>
                        <label class="form-check-label" for="white">
                            White
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-auto">
            <div class="card" style="width: 22rem;">
                <img src="images/logseq-light-sepia.jpg" class="card-img-top" alt="Sepia theme" on:click={() => showImage('light-sepia')}>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="sepia" id="sepia" bind:group={light} value={'sepia'} on:change={buildCss}>
                        <label class="form-check-label" for="sepia">
                            Sepia
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="form-check form-switch my-3">
        <input class="form-check-input" type="checkbox" id="lightDots" bind:checked={lightDots} on:change={buildCss}>
        <label class="form-check-label" for="lightDots">With dots in background?</label>
    </div>

</div>

<div class="mb-5">

    <h4>Dark theme I like the most...</h4>

    <div class="row">
        <div class="col-auto">
            <div class="card" style="width: 22rem;">
                <img src="images/logseq-dark-black.jpg" class="card-img-top" alt="Black theme" on:click={() => showImage('dark-black')}>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="black" id="black" bind:group={dark} value={'black'} on:change={buildCss}>
                        <label class="form-check-label" for="black">
                            Black
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-auto">
            <div class="card" style="width: 22rem;">
                <img src="images/logseq-dark-coffee.jpg" class="card-img-top" alt="Coffee theme" on:click={() => showImage('dark-coffee')}>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="coffee" id="coffee" bind:group={dark} value={'coffee'} on:change={buildCss}>
                        <label class="form-check-label" for="coffee">
                            Coffee
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="form-check form-switch my-3">
        <input class="form-check-input" type="checkbox" id="darkDots" bind:checked={darkDots} on:change={buildCss}>
        <label class="form-check-label" for="darkDots">With dots in background?</label>
    </div>

</div>



<div class="output-wrapper">

    <div class="row">

        <div class="col-xs-12 col-sm-12 col-md-6">
            <p>There are two ways to get these themes. You can either copy entire styles to your custom css file, or copy only links to styles. Use first option if you're sometimes offline and you want to have these themes always available. Use the second if you're always online - you'll get automatically all updates and fixes.</p>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="offlineOrOnline" id="offline" bind:group={offlineOrOnline} value={'offline'} on:change={buildCss}>
                <label class="form-check-label" for="offline">
                    I'm working offline
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="offlineOrOnline" id="online" bind:group={offlineOrOnline} value={'online'} on:change={buildCss}>
                <label class="form-check-label" for="online">
                    I'm always online
                </label>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="css-to-copy d-grid gap-1">
                <button type="button" class="btn btn-info mb-3" on:click={copy}>
                    {#if copied}
                        <span>🎉 Copied! Now you can paste it to your css file</span>
                    {:else}
                        <span>Click here to copy this to clipboard</span>
                    {/if}
                </button>
                <pre>
                    {css}
                </pre>
            </div>
        </div>

    </div>

</div>



<div bind:this={modalEl} class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content modal-theme-preview" on:click={()=>modal.hide()}>
            {@html modalContent}
        </div>
    </div>
</div>

<style>
    .card-img-top,
    .form-check-label,
    .form-check-input {
        cursor: pointer;
    }

    .css-to-copy {
        background: #f7f7f7;
        border-radius: 5px;
        padding: 20px 20px 10px 20px;
    }
    .css-to-copy pre {
        height: 150px;
    }
</style>