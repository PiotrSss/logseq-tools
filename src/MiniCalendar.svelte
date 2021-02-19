<script>
    import Month from './MiniCalendar/Month.svelte'
    import MultipleMonths from './MiniCalendar/MultipleMonths.svelte'
    import Year from './MiniCalendar/Year.svelte'
    
    let calendarOption = localStorage.getItem('calendarOption') ? localStorage.getItem('calendarOption') : 'month'
    const onCalendarOptionChange = option => {
        calendarOption = option
        localStorage.setItem('calendarOption', calendarOption)
    }

    let firstDayOfTheWeek = localStorage.getItem('firstDayOfTheWeek') ? parseInt(localStorage.getItem('firstDayOfTheWeek')) : 1 // 0: sunday; 1: monday
    const onFirstDayOfTheWeekChange = (event) => {
        firstDayOfTheWeek = event.detail.firstDayOfTheWeek
        localStorage.setItem('firstDayOfTheWeek', firstDayOfTheWeek)
    }

    let dateFormat = localStorage.getItem('dateFormat') ? localStorage.getItem('dateFormat') : 'MMM do, yyyy'
    const onDateFormatChange = (event) => {
        dateFormat = event.detail.dateFormat
        localStorage.setItem('dateFormat', dateFormat)
    }

</script>

<p>I want to get...</p>
<ul>
    <li on:click={() => onCalendarOptionChange('month')}>a month</li>
    <li on:click={() => onCalendarOptionChange('multiple months')}>multiple months</li>
    <li on:click={() => onCalendarOptionChange('year')}>a year</li>
</ul>

{#if calendarOption === 'month'}
<Month {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} {dateFormat} on:dateFormatChange={onDateFormatChange} />
{:else if calendarOption === 'multiple months'}
<MultipleMonths {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} {dateFormat} on:dateFormatChange={onDateFormatChange} />
{:else}
<Year {firstDayOfTheWeek} on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} {dateFormat} on:dateFormatChange={onDateFormatChange} />
{/if}

<style>
    
</style>