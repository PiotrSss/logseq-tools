<script>
    import { createEventDispatcher } from "svelte"
    import { copyToClipboard, buildCalendarMonths } from '../helpers.ts'
    import CalendarCss from './CalendarCss.svelte'
    import Output from './Output.svelte'
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

    const onCopyButtonClick = () => {
        copyToClipboard(buildCalendarMonth(month - 1, year, dateFormat, firstDayOfTheWeek))
    }

</script>

<div class="col-xs-12 col-md-6">

    <form class="my-3 mx-3">

        <div class="row">

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <div class="row g-2 align-items-center">
                    <div class="col-auto">
                        <label for="year" class="col-form-label">Year:</label>
                    </div>
                    <div class="col-auto">
                        <input id="year" class="form-control" bind:value={year} type=number min=1971 max=2050 on:change={onYearChange}>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2"></div>

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
