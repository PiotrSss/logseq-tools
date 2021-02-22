<script>
    import { createEventDispatcher } from "svelte"
    import { copyToClipboard, buildCalendarMonths } from '../helpers.ts'
    import CalendarCss from './CalendarCss.svelte'
    import Output from './Output.svelte'
    import FirstDayOfTheWeek from './FirstDayOfTheWeek.svelte'
    import DateFormat from './DateFormat.svelte'
    import LocaleSelector from './LocaleSelector.svelte'

    export let dateFormat, firstDayOfTheWeek, locale
    const dispatch = createEventDispatcher()

    let year = (new Date()).getFullYear()
    const onYearChange = (event) => {
        updateCalendarHtml()
    }

    let calendarHtml = buildCalendarMonths(new Date(year, 0, 1), new Date(year, 11, 1), dateFormat, firstDayOfTheWeek, locale)
    const updateCalendarHtml = () => {
        calendarHtml = buildCalendarMonths(new Date(year, 0, 1), new Date(year, 11, 1), dateFormat, firstDayOfTheWeek, locale)
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

    const onLocaleChange = (event) => {
        locale = event.detail.locale
		dispatch("localeChange", { locale })
        updateCalendarHtml()
	}

    const onCopyButtonClick = () => {
        copyToClipboard(buildCalendarMonths(new Date(year, 0, 1), new Date(year, 11, 1), dateFormat, firstDayOfTheWeek, locale))
    }

</script>

<div class="col-xs-12 col-md-6">

    <form class="mt-1 mb-3 mx-3">

        <div class="row">

            <div class="row g-2 align-items-center">
                <div class="col-auto">
                    <label for="year" class="col-form-label">Year:</label>
                </div>
                <div class="col-auto">
                    <input id="year" class="form-control" bind:value={year} type=number min=1971 max=2050 on:change={onYearChange}>
                </div>
            </div>

            <FirstDayOfTheWeek {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} />

            <DateFormat {dateFormat} on:dateFormatChange={onDateFormatChange} />

            <LocaleSelector {locale} on:localeChange={onLocaleChange} />

        </div>

    </form>

    <hr>

    <CalendarCss />

</div>

<div class="col-xs-12 col-md-6">

    <Output {calendarHtml} on:click={onCopyButtonClick} />

</div>
