import { format, getWeeksInMonth, startOfWeek, isSameMonth, addDays, addMonths } from 'date-fns'

export const copyToClipboard = (text) => {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

export const buildCalendarMonth = (month, year, dateFormat, firstDayOfTheWeek) => {
    let weeksInMonth = getWeeksInMonth(new Date(year, month), { weekStartsOn: firstDayOfTheWeek })
    let currentDay = startOfWeek(new Date(year, month), { weekStartsOn: firstDayOfTheWeek })
    let result = `<table><thead><tr>${(firstDayOfTheWeek === 1 ? '' : '<th>Sun</th>')}<th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>${(firstDayOfTheWeek === 1 ? '<th>Sun</th>' : '')}</tr></thead><tbody>`
    for (let i = 1; i <= weeksInMonth; i++) {
        result += '<tr>'
        for (let j = 0; j < 7; j++) {
            result += `${isSameMonth(currentDay, new Date(year, month, 1)) ? '<td>' : '<td class="outofmonth">'}<a data-ref="${format(currentDay, dateFormat)}" href="#/page/${format(currentDay, dateFormat)}" class="page-ref">${format(currentDay, 'd')}</a></td>`
            currentDay = addDays(currentDay, 1)
        }
        result += '</tr>'
    }
    return `
<div class="logseq-tools-calendar"><h2>${format(new Date(year, month, 1), 'MMMM')} ${year}</h2>
${result}</tbody></table></div>
`
}

export const buildCalendarMonths = (startDate, endDate, dateFormat, firstDayOfTheWeek) => {
    let result = ''
    endDate = addMonths(endDate, 1)
    while (!isSameMonth(startDate, endDate)) {
        result += buildCalendarMonth(startDate.getMonth(), startDate.getFullYear(), dateFormat, firstDayOfTheWeek)
        startDate = addMonths(startDate, 1)
    }
    return `<div class="logseq-tools-multiple-calendars">${result}</div>`
}