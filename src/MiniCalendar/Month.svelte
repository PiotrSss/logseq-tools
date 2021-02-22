<script>
    import { createEventDispatcher } from "svelte"
    import { copyToClipboard, buildCalendarMonth } from '../helpers.ts'
    import CalendarCss from './CalendarCss.svelte'
    import Output from './Output.svelte'
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
                        <label for="month" class="col-form-label">Month:</label>
                    </div>
                    <div class="col-auto">
                        <input id="month" class="form-control" bind:value={month} type=number min=1 max=12 on:change={onMonthChange}>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />
            </div>

            <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                <div class="row g-2 align-items-center">
                    <div class="col-auto">
                        <label for="year" class="col-form-label">Year:</label>
                    </div>
                    <div class="col-auto">
                        <input id="year" class="form-control" bind:value={year} type=number min=1971 max=2050>
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
