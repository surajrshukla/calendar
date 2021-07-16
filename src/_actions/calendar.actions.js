import { CalendarConstants } from '../_constants/calendar.constants';

export const calendarAction = {
    create_calendar
};


function create_calendar() {
    return {
        type: CalendarConstants.CREATE_CALENDER
    }
}
