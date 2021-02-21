<script>
    import { createEventDispatcher } from "svelte"
    import { copyToClipboard, buildCalendarMonths } from '../helpers.ts'
    import FirstDayOfTheWeek from './FirstDayOfTheWeek.svelte'
    import DateFormat from './DateFormat.svelte'

    export let dateFormat, firstDayOfTheWeek
    const dispatch = createEventDispatcher()

    let year = (new Date()).getFullYear()
    const onYearChange = (event) => {
        updateCalendarHtml()
    }

    let calendarHtml = buildCalendarMonths(new Date(year, 0, 1), new Date(year, 11, 1), dateFormat, firstDayOfTheWeek)
    const updateCalendarHtml = () => {
        calendarHtml = buildCalendarMonths(new Date(year, 0, 1), new Date(year, 11, 1), dateFormat, firstDayOfTheWeek)
    }

    const onFirstDayOfTheWeekChange = (event) => {
        firstDayOfTheWeek = event.detail.firstDayOfTheWeek
		dispatch("firstDayOfTheWeekChange", { firstDayOfTheWeek })
        updateCalendarHtml()
	}

    const onDateFormatChange = (event) => {
        dateFormat = event.detail.dateFormat
        dispatch('dateFormatChange', { dateFormat })
        updateCalendarHtml()
    }

    const copy = () => copyToClipboard(buildCalendarMonths(new Date(year, 0, 1), new Date(year, 11, 1), dateFormat, firstDayOfTheWeek))

</script>

<FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />

<DateFormat {dateFormat} on:dateFormatChange={onDateFormatChange} />

<input bind:value={year} type=number min=1971 max=2050 on:change={onYearChange} />

<code>{@html calendarHtml}</code>

<button on:click={copy}>Copy</button>