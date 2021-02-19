<script>
    import { createEventDispatcher } from "svelte"
    import { format, addMonths } from 'date-fns'
    import { copyToClipboard, buildCalendarMonths } from '../helpers.ts'

    import FirstDayOfTheWeek from './FirstDayOfTheWeek.svelte'

    const today = new Date()
    const thisMonth = today.getMonth() + 1
    const thisYear = today.getFullYear()

    let startMonth = thisMonth
    let startYear = thisYear
    let startDate = new Date(startYear, startMonth - 1, 1)

    let endDate = addMonths(startDate, 2)
    let endMonth = endDate.getMonth() + 1
    let endYear = endDate.getFullYear()

    let calendarHtml = buildCalendarMonths(month - 1, year, dateFormat, firstDayOfTheWeek)
    const updateCalendarHtml = () => {
        calendarHtml = buildCalendarMonths(month - 1, year, dateFormat, firstDayOfTheWeek)
    }

    const onStartMonthChange = (event) => {

    }

    export let firstDayOfTheWeek
    const dispatch = createEventDispatcher()
	const onFirstDayOfTheWeekChange = (event) => {
		dispatch("firstDayOfTheWeekChange", { firstDayOfTheWeek: event.detail.firstDayOfTheWeek })
        updateCalendarHtml()
	}

</script>

<FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />

Start date:
<input bind:value={startMonth} type=number min=1 max=12 on:change={onStartMonthChange} />
<input bind:value={startYear} type=number min=1971 max=2050 on:change={onStartYearChange} />

End date:
<input bind:value={endMonth} type=number min=1 max=12 on:change={onEndMonthChange} />
<input bind:value={endYear} type=number min=1971 max=2050 on:change={onEndYearChange} />
