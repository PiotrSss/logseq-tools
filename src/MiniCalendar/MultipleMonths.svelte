<script>
    import { createEventDispatcher } from "svelte"
    import { addMonths, isBefore, isSameMonth } from 'date-fns'
    import { copyToClipboard, buildCalendarMonths } from '../helpers.ts'
    import CalendarCss from './CalendarCss.svelte'
    import Output from './Output.svelte'
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

    const onCopyButtonClick = () => {
        if (startBeforeOrEqualEnd(startDate, endDate)) {
            copyToClipboard(buildCalendarMonths(startDate, endDate, dateFormat, firstDayOfTheWeek))
        } else {
            alert('Start date after end date - are you sure? :)')
        }
    }
    
</script>

<div class="col-xs-12 col-md-6">

    <form class="my-3 mx-3">

        <div class="row">

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <div class="row g-2 align-items-center">
                    <div class="col-auto">
                        <label for="start-month" class="col-form-label">Start date:</label>
                    </div>
                    <div class="col-auto">
                        <input id="start-month" class="form-control" bind:value={startMonth} type=number min=1 max=12 on:change={onStartMonthChange}>
                    </div>
                    <div class="col-auto">
                        <input id="start-year" class="form-control" bind:value={startYear} type=number min=1971 max=2050 on:change={onStartYearChange}>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <div class="row g-2 align-items-center">
                    <div class="col-auto">
                        <label for="end-month" class="col-form-label">End date:</label>
                    </div>
                    <div class="col-auto">
                        <input id="end-month" class="form-control" bind:value={endMonth} type=number min=1 max=12 on:change={onEndMonthChange}>
                    </div>
                    <div class="col-auto">
                        <input id="end-year" class="form-control" bind:value={endYear} type=number min=1971 max=2050 on:change={onEndYearChange}>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <DateFormat {dateFormat} on:dateFormatChange={onDateFormatChange} />
            </div>

        </div>

    </form>

    <hr>

    <CalendarCss />

</div>

<div class="col-xs-12 col-md-6">

    <Output {calendarHtml} on:click={onCopyButtonClick} />

</div>