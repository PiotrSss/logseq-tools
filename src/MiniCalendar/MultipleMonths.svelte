<script>
    import { createEventDispatcher } from "svelte"
    import { addMonths, isBefore, isSameMonth } from 'date-fns'
    import { copyToClipboard, buildCalendarMonths } from '../helpers.ts'
    import FirstDayOfTheWeek from './FirstDayOfTheWeek.svelte'
    import DateFormat from './DateFormat.svelte'

    export let dateFormat, firstDayOfTheWeek
    const dispatch = createEventDispatcher()

    const today = new Date()
    const thisMonth = today.getMonth() + 1
    const thisYear = today.getFullYear()

    let startMonth = thisMonth
    let startYear = thisYear
    let startDate = new Date(startYear, startMonth - 1, 1)

    let endDate = addMonths(startDate, 2)
    let endMonth = endDate.getMonth() + 1
    let endYear = endDate.getFullYear()

    const startBeforeOrEqualEnd = (startDate, endDate) => isBefore(startDate, endDate) || isSameMonth(startDate, endDate)

    let calendarHtml = buildCalendarMonths(startDate, endDate, dateFormat, firstDayOfTheWeek)
    const updateCalendarHtml = () => {
        if (startBeforeOrEqualEnd(startDate, endDate)) {
            calendarHtml = buildCalendarMonths(startDate, endDate, dateFormat, firstDayOfTheWeek)
        } else {
            calendarHtml = `<span class="validation-error">Start date after end date - are you sure? :)</span>`
        }
    }

    const onStartMonthChange = (event) => {
        startDate = new Date(startYear, event.currentTarget.value - 1, 1)
        updateCalendarHtml()
    }
    const onStartYearChange = (event) => {
        startDate = new Date(event.currentTarget.value, startMonth - 1, 1)
        updateCalendarHtml()
    }
    const onEndMonthChange = (event) => {
        endDate = new Date(endYear, event.currentTarget.value - 1, 1)
        updateCalendarHtml()
    }
    const onEndYearChange = (event) => {
        endDate = new Date(event.currentTarget.value, endMonth - 1, 1)
        updateCalendarHtml()
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

    const copy = () => {
        if (startBeforeOrEqualEnd(startDate, endDate)) {
            copyToClipboard(buildCalendarMonths(startDate, endDate, dateFormat, firstDayOfTheWeek))
        } else {
            alert('Start date after end date - are you sure? :)')
        }
    }
    
</script>

<FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />

<DateFormat {dateFormat} on:dateFormatChange={onDateFormatChange} />

Start date:
<input bind:value={startMonth} type=number min=1 max=12 on:change={onStartMonthChange} />
<input bind:value={startYear} type=number min=1971 max=2050 on:change={onStartYearChange} />

End date:
<input bind:value={endMonth} type=number min=1 max=12 on:change={onEndMonthChange} />
<input bind:value={endYear} type=number min=1971 max=2050 on:change={onEndYearChange} />

<code>{@html calendarHtml}</code>

<button on:click={copy}>Copy</button>