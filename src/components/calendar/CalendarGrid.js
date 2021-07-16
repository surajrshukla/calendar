import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReminderDialog from './reminder/ReminderDialog';
import Reminder from './reminder/reminder';
import ReminderPopup from './reminder/ReminderPopup';
import { reminderAction } from '../../_actions/reminder.actions';
import { find } from 'lodash';

class CalendarGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            openPopup: false
        }
    }

    componentDidMount = () => {
        if (this.props.day.dayOfMonth >= this.props.currentMonthDetail.currentDate.getDate() && this.props.day.isCurrentMonth) {
            this.props.dispatch(reminderAction.registerGrid(this.props.day))
        }
    }

    openDialog = () => {
        this.setState({ isDialogOpen: true })
    }
    handleClose = () => {
        this.setState({ isDialogOpen: false })
    }

    handleAddReminder = (ev) => {
        ev.stopPropagation();
        if (this.props.day.dayOfMonth < this.props.currentMonthDetail.currentDate.getDate()) return;
        this.openDialog();
    }

    handleOpenReminderPopup = (ev, reminders, gridId) => {
        ev.stopPropagation();
        this.setState({ openPopup: true })
    }

    handleCloseReminderPopup = () => {
        this.setState({ openPopup: false })
    }

    renderReminders = grid => {
        if (grid.reminders.length > 1) {
            return <>
                <Reminder gridId={grid.id} key={grid.reminders[0].id} reminder={grid.reminders[0]} />
                <Reminder gridId={grid.id} key={grid.reminders[1].id} reminder={grid.reminders[1]} />
                {grid.reminders.length - 2 !== 0 && <div onClick={ev => this.handleOpenReminderPopup(ev, grid.reminders.slice(2), grid.id)} id={grid.id + "_extra"} className="link">{`+ ${grid.reminders.length - 2} more`}</div>}
            </>
        }

        return grid.reminders.map(reminder => (<Reminder gridId={grid.id} key={reminder.id} reminder={reminder} />))
    }

    renderPopup = (reminder, gridIds) => {
        return <ReminderPopup handleCloseReminderPopup={this.handleCloseReminderPopup}>
            {reminder.map(reminder => (<Reminder gridId={gridIds} key={reminder.id} reminder={reminder} />))}
        </ReminderPopup>
    }

    render() {
        const grid = find(this.props.grids, { dayOfMonth: this.props.day.dayOfMonth, isCurrentMonth: true });

        return <li onClick={this.handleAddReminder} className={this.props.day.isCurrentMonth ? "calendar_day" : "calendar_day calendar_day_not_current"}>
            <div className={this.props.day.date === `${this.props.currentMonthDetail.currentDate.getDate()} ${this.props.currentMonthDetail.currentMonth} ${this.props.currentMonthDetail.currentYear}` ? "calendar_day_today" : ""}>
                <span>{this.props.day.dayOfMonth}</span>
            </div>
            {this.state.isDialogOpen && <ReminderDialog gridId={this.props.day.id} handleClose={this.handleClose} />}
            {grid && grid.reminders.length && this.props.day.isCurrentMonth > 0 ? this.renderReminders(grid) : null}
            {grid && this.state.openPopup && this.renderPopup(grid.reminders.slice(2), grid.id)}
        </li>
    }

}

function mapStateToProps(state) {
    const currentMonthDetail = state.calendar.currentMonthDetail ? state.calendar.currentMonthDetail : {}
    return {
        currentMonthDetail,
        grids: state.reminders.grids,
        rerender: state.reminders.rerender
    };
}

export default connect(mapStateToProps, null)(CalendarGrid);