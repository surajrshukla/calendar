

import { CalendarConstants } from '../_constants/calendar.constants';
import { month, getDaysInMonth, createDaysForCurrentMonth, previousMonthDays } from '../_helpers/calender_halpers';


export function calendar(state = {}, action) {
    switch (action.type) {
        case CalendarConstants.CREATE_CALENDER:
            const currentDate = new Date();
            const currentMonthDetail = {
                currentDate: currentDate,
                currentMonth: month[currentDate.getMonth()],
                firstDayOfMonth: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                lastDayOfMonth: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
                daysInCurrentMonth: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()),
                currentYear: currentDate.getFullYear(),

            }
            const previousMonthDaysToSkip = previousMonthDays(currentMonthDetail.currentMonth, currentMonthDetail.currentYear, currentMonthDetail.firstDayOfMonth.getDay());
            const currentMonthdays = createDaysForCurrentMonth(currentMonthDetail.daysInCurrentMonth, currentMonthDetail.currentMonth, currentMonthDetail.currentYear);
            currentMonthDetail.days = [...previousMonthDaysToSkip, ...currentMonthdays]

            return {
                currentMonthDetail
            }
        default:
            return state
    }
}
