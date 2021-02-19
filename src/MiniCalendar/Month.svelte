<script>
    import { createEventDispatcher } from "svelte"
    import { copyToClipboard, buildCalendarMonth } from '../helpers.ts'
    import FirstDayOfTheWeek from './FirstDayOfTheWeek.svelte'
    import DateFormat from './DateFormat.svelte'

    export let dateFormat, firstDayOfTheWeek
    const dispatch = createEventDispatcher()

    const today = new Date()
    const thisMonth = today.getMonth() + 1
    const thisYear = today.getFullYear()

    const onDateFormatChange = (event) => {
        dateFormat = event.detail.dateFormat
        dispatch('dateFormatChange', { dateFormat })
        updateCalendarHtml()
    }

	const onFirstDayOfTheWeekChange = (event) => {
        firstDayOfTheWeek = event.detail.firstDayOfTheWeek
		dispatch("firstDayOfTheWeekChange", { firstDayOfTheWeek })
        updateCalendarHtml()
	}

    let month = localStorage.getItem('month') ? parseInt(localStorage.getItem('month')) : thisMonth
    const onMonthChange = (event) => {
        localStorage.setItem('month', event.currentTarget.value)
        updateCalendarHtml()
    }

    let year = localStorage.getItem('year') ? parseInt(localStorage.getItem('year')) : thisYear
    $: {
        localStorage.setItem('year', year)
        updateCalendarHtml()
    }

    let calendarHtml = buildCalendarMonth(month - 1, year, dateFormat, firstDayOfTheWeek)
    const updateCalendarHtml = () => {
        calendarHtml = buildCalendarMonth(month - 1, year, dateFormat, firstDayOfTheWeek)
    }
    
    const copy = () => copyToClipboard(buildCalendarMonth(month - 1, year, dateFormat, firstDayOfTheWeek))
</script>

<p>Month:</p>
<input bind:value={month} type=number min=1 max=12 on:change={onMonthChange} />

<p>Year:</p>
<input bind:value={year} type=number min=1971 max=2050>

<FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />

<DateFormat {dateFormat} on:dateFormatChange={onDateFormatChange} />

<code>{@html calendarHtml}</code>

<button on:click={copy}>Copy</button>