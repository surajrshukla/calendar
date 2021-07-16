import React from 'react';

const CalendarHeader = (props) => {
    return (
        <div className="calendar_month_header">
            <div className="calendar_month_header_selected_month">
                {`${props.currentMonth} ${props.currentYear}`}
            </div>
        </div>
    )
}

export default CalendarHeader;