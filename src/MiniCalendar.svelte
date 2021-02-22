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
    
    let locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en-US'
    const onLocaleChange = (event) => {
        locale = event.detail.locale
        localStorage.setItem('locale', locale)
    }

</script>

<div class="container">

    <h4 class="mb-4">I want to generate...</h4>

    <ul class="nav nav-tabs">
        <li class="nav-item" on:click={() => onCalendarOptionChange('month')}>
            <span class={`nav-link ${calendarOption === 'month' ? 'active' : ''}`}>a month</span>
        </li>
        <li class="nav-item" on:click={() => onCalendarOptionChange('multiple months')}>
            <span class={`nav-link ${calendarOption === 'multiple months' ? 'active' : ''}`}>multiple months</span>
        </li>
        <li class="nav-item" on:click={() => onCalendarOptionChange('year')}>
            <span class={`nav-link ${calendarOption === 'year' ? 'active' : ''}`}>a year</span>
        </li>
    </ul>

    <div class="row">
        {#if calendarOption === 'month'}
        <Month 
            {firstDayOfTheWeek} 
            on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} 
            {dateFormat} 
            on:dateFormatChange={onDateFormatChange}
            {locale}
            on:localeChange={onLocaleChange}
        />
        {:else if calendarOption === 'multiple months'}
        <MultipleMonths 
            {firstDayOfTheWeek} 
            on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} 
            {dateFormat} 
            on:dateFormatChange={onDateFormatChange}
            {locale}
            on:localeChange={onLocaleChange}
        />
        {:else}
        <Year 
            {firstDayOfTheWeek} 
            on:firstDayOfTheWeekChange={onFirstDayOfTheWeekChange} 
            {dateFormat} 
            on:dateFormatChange={onDateFormatChange}
            {locale}
            on:localeChange={onLocaleChange}
        />
        {/if}
    </div>

</div>

<style>
    .nav-item {
        cursor: pointer;
    }
</style>