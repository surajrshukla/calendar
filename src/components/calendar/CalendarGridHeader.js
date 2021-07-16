import React from 'react';
import { weekdays } from '../../_helpers/calender_halpers';


const CalendarGridHeader = () => {
    return (
        <ol className="day_of_week">
            {weekdays.map((weekday, index) => <li key={index}>{weekday}</li>)}
        </ol >
    )
}

export default CalendarGridHeader