<script>
    import { onMount } from 'svelte'
    import { format, getDaysInMonth, getWeeksInMonth, startOfWeek, isSameMonth, addDays } from 'date-fns'

    import { copyToClipboard } from './helpers.ts'

    let userDateFormat = 'MMM do, yyyy'

    let month = 5
    let year = 2021
    let firstDayOfTheWeek = 1 // 0 - sunday, 1 - monday

    const tableHead = () => {
        let thead = '<thead><tr>'
        thead += firstDayOfTheWeek === 1 ? '' : '<th>Sun</th>'
        thead += '<th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>'
        thead += firstDayOfTheWeek === 1 ? '<th>Sun</th>' : ''
        thead += '</tr></thead>'
        return thead
    }

    const renderMonth = (preview, year, month, userDateFormat) => {

        let outputToCopy = `<table class="calendar">${tableHead()}<tbody class="calendar-body">`

        let weeksInMonth = getWeeksInMonth(new Date(year, month - 1), { weekStartsOn: firstDayOfTheWeek })
        let currentDay = startOfWeek(new Date(year, month - 1), { weekStartsOn: firstDayOfTheWeek })

        for (let i = 1; i <= weeksInMonth; i++) {
            
            outputToCopy += '<tr>'

            for (let j = 0; j < 7; j++) {

                if (isSameMonth(currentDay, new Date(year, month - 1, 1))) {
                    outputToCopy += `<td class="thismonth">`
                } else {
                    outputToCopy += `<td class="outofmonth">`
                }
                outputToCopy += `[[${format(currentDay, userDateFormat)}]]`
                outputToCopy += `</td>`

                currentDay = addDays(currentDay, 1)

            }

            outputToCopy += '</tr>'

        }

        outputToCopy += '</tbody></table>'
        // output.textContent = table
        preview.innerHTML = ''
        let template = document.createElement('template');
        template.innerHTML = outputToCopy;
        preview.append(template.content.firstChild)
        return `## May 2021
        :PROPERTIES:
        :heading: true
        :END:
        ### 
        ${outputToCopy}`
    }

    let preview;
    let outputToCopy = ''
    
    $: if (userDateFormat.split('').length >= 2) {
        try {
            outputToCopy = renderMonth(preview, year, month, userDateFormat)
        } catch (error) {
            preview = `(${error.message})`
        }
	}
    const copy = () => copyToClipboard(outputToCopy)

</script>

<input bind:value={month} type=number min=1 max=12 on:change={()=>renderMonth(preview, year, month, userDateFormat)} />
<input bind:value={year} type=number min=2020 max=2050 />

<input bind:value={userDateFormat} />

<h2>Preview:</h2>
<div bind:this={preview}>
    
</div>

<button on:click={copy}>Copy</button>