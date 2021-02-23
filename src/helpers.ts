import { format, getWeeksInMonth, startOfWeek, isSameMonth, addDays, addMonths } from 'date-fns'
import * as locales from 'date-fns/locale'

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

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

export const buildCalendarMonth = (month, year, dateFormat, firstDayOfTheWeek, locale) => {
    let weeksInMonth = getWeeksInMonth(new Date(year, month), { weekStartsOn: firstDayOfTheWeek })
    let currentDay = startOfWeek(new Date(year, month), { weekStartsOn: firstDayOfTheWeek })
    locale = locale.replace('-','')
    const days = {
        0: capitalize(locales[locale].localize.day(0, {width: 'abbreviated'})),
        1: capitalize(locales[locale].localize.day(1, {width: 'abbreviated'})),
        2: capitalize(locales[locale].localize.day(2, {width: 'abbreviated'})),
        3: capitalize(locales[locale].localize.day(3, {width: 'abbreviated'})),
        4: capitalize(locales[locale].localize.day(4, {width: 'abbreviated'})),
        5: capitalize(locales[locale].localize.day(5, {width: 'abbreviated'})),
        6: capitalize(locales[locale].localize.day(6, {width: 'abbreviated'})),
    }
    let result = `<table><thead><tr>${(firstDayOfTheWeek === 1 ? '' : `<th>${days[0]}</th>`)}<th>${days[1]}</th><th>${days[2]}</th><th>${days[3]}</th><th>${days[4]}</th><th>${days[5]}</th><th>${days[6]}</th>${(firstDayOfTheWeek === 1 ? `<th>${days[0]}</th>` : '')}</tr></thead><tbody>`
    for (let i = 1; i <= weeksInMonth; i++) {
        result += '<tr>'
        for (let j = 0; j < 7; j++) {
            result += `${isSameMonth(currentDay, new Date(year, month, 1)) ? '<td>' : '<td class="outofmonth">'}<a data-ref="${format(currentDay, dateFormat)}" href="#/page/${format(currentDay, dateFormat)}" class="page-ref">${format(currentDay, 'd')}</a></td>`
            currentDay = addDays(currentDay, 1)
        }
        result += '</tr>'
    }
    return `
<div class="logseq-tools-calendar"><h2>${capitalize(format(new Date(year, month, 1), 'LLLL', {locale: locales[locale]}))} ${year}</h2>
${result}</tbody></table></div>
`
}

export const buildCalendarMonths = (startDate, endDate, dateFormat, firstDayOfTheWeek, locale) => {
    let result = ''
    endDate = addMonths(endDate, 1)
    while (!isSameMonth(startDate, endDate)) {
        result += buildCalendarMonth(startDate.getMonth(), startDate.getFullYear(), dateFormat, firstDayOfTheWeek, locale)
        startDate = addMonths(startDate, 1)
    }
    return `<div class="logseq-tools-multiple-calendars">${result}</div>`
}

export const baseUrl = location.origin.includes('localhost') ? 'http://localhost:5000/' : 'https://piotrsss.github.io/logseq-tools/public/'

export const loadCss = async (url, callback) => {
    const response = await fetch(baseUrl + url);
    callback(await response.text())
}