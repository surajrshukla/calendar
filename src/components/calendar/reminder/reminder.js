import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseTime } from '../../../_helpers/calender_halpers'
import ReminderDialog from './ReminderDialog';
import { reminderAction } from '../../../_actions/reminder.actions'

class Reminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false
        }
    }

    openDialog = (ev) => {
        this.setState({ isDialogOpen: true })
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false })
    }

    handleDelete = (ev) => {
        ev.stopPropagation()
        this.props.dispatch(reminderAction.delete_reminder(this.props.gridId, this.props.reminder.id))
    }


    render() {
        return <>
            <div onClick={ev => ev.stopPropagation()} className="reminder" style={{ backgroundColor: this.props.reminder.color }}>
                <div>{this.props.reminder.description} <span onClick={this.handleDelete} style={{ float: "right", padding: 4 }} className="link">x</span> <span onClick={this.openDialog} style={{ float: "right", padding: 4 }} className="link">edit</span></div>
                <div>{parseTime(this.props.reminder.reminderHour, this.props.reminder.reminderMinute)}</div>
            </div>
            {this.state.isDialogOpen && <ReminderDialog mode="UP" gridId={this.props.gridId} reminder={this.props.reminder} handleClose={this.handleClose} />}
        </>
    }
}

export default connect(null, null)(Reminder);

