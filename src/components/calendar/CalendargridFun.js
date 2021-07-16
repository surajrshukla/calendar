import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { reminderAction } from '../../_actions/reminder.actions';
import { find } from 'lodash';
import ReminderDialog from './reminder/ReminderDialog';
import Reminder from './reminder/reminder';


const CalendarGridFunc = (props) => {
    const [isDialogOpen, setState] = useState(false);
    const [openPopup, setPopUp] = useState(false);

    useEffect(() => {
        if (props.day.dayOfMonth >= props.currentMonthDetail.currentDate.getDate() && props.day.isCurrentMonth) {
            props.dispatch(reminderAction.registerGrid(props.day))
        }
    }, [isDialogOpen]);

    const handleOpenReminderPopup = (ev) => {
        ev.stopPropagation();
        setPopUp(true)
    }

    openDialog = () => {
        setState(true)
    }

    const renderPopup = () => {
        if (grid.reminders.length > 1) {
            return <>
                <Reminder gridId={grid.id} key={grid.reminders[0].id} reminder={grid.reminders[0]} />
                <Reminder gridId={grid.id} key={grid.reminders[1].id} reminder={grid.reminders[1]} />
                {grid.reminders.length - 2 !== 0 && <div onClick={ev => handleOpenReminderPopup(ev, grid.reminders.slice(2), grid.id)} id={grid.id + "_extra"} className="link">{`+ ${grid.reminders.length - 2} more`}</div>}
            </>
        }

        return grid.reminders.map(reminder => (<Reminder gridId={grid.id} key={reminder.id} reminder={reminder} />))
    }

    const handleAddReminder = (ev) => {
        ev.stopPropagation();
        if (props.day.dayOfMonth < props.currentMonthDetail.currentDate.getDate()) return;
        openDialog();
    }


    const grid = find(.props.grids, { dayOfMonth: props.day.dayOfMonth, isCurrentMonth: true });
    return (<li onClick={this.handleAddReminder} className={props.day.isCurrentMonth ? "calendar_day" : "calendar_day calendar_day_not_current"}>
        <div className={props.day.date === `${props.currentMonthDetail.currentDate.getDate()} ${props.currentMonthDetail.currentMonth} ${props.currentMonthDetail.currentYear}` ? "calendar_day_today" : ""}>
            <span>{props.day.dayOfMonth}</span>
        </div>
        {isDialogOpen && <ReminderDialog gridId={props.day.id} handleClose={this.handleClose} />}
        {grid && grid.reminders.length && props.day.isCurrentMonth > 0 ? this.renderReminders(grid) : null}
        {grid && openPopup && renderPopup(grid.reminders.slice(2), grid.id)}
    </li>)
}

function mapStateToProps(state) {
    const currentMonthDetail = state.calendar.currentMonthDetail ? state.calendar.currentMonthDetail : {}
    return {
        currentMonthDetail,
        grids: state.reminders.grids,
        rerender: state.reminders.rerender
    };

}


export default connect(mapStateToProps, null)(CalendarGridFunc);
