import React, { Component } from 'react';
import Dialog from 'react-dialog';
import ReminderColorPicker from './ReminderColorPicker';
import { reminderAction } from '../../../_actions/reminder.actions';
import { colors } from '../../../_helpers/calender_halpers';
import { connect } from 'react-redux';

const uniqid = require('uniqid');

class ReminderDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reminderText: this.props.reminder ? this.props.reminder.description : "",
            reminderHour: this.props.reminder ? this.props.reminder.reminderHour : 0,
            reminderMinute: this.props.reminder ? this.props.reminder.reminderMinute : 0,
            color: this.props.reminder ? Object.keys(colors).find(key => colors[key] === this.props.reminder.color) : "blue"
        }
    }

    handleClose = (ev) => {
        ev.stopPropagation();
        this.props.handleClose()
    }

    handleReminderText = (ev) => {
        ev.stopPropagation();
        if (ev.currentTarget.value.length > 20) {
            return alert("You can not add more then 20 charecters")
        }

        this.setState({
            reminderText: ev.currentTarget.value
        })
    }

    handleReminderHour = (ev) => {
        ev.stopPropagation();
        if (ev.currentTarget.value === "") {
            this.setState({
                reminderHour: ""
            });;
            return
        }
        if (parseInt(ev.currentTarget.value) < 0 || parseInt(ev.currentTarget.value) > 23) {
            return alert("enter hour value in range of 00 to 23")
        }

        this.setState({
            reminderHour: parseInt(ev.currentTarget.value)
        });
    }
    handleReminderMinutes = (ev) => {
        ev.stopPropagation();
        if (ev.currentTarget.value === "") {
            this.setState({
                reminderMinute: ""
            });;
            return
        }
        if (parseInt(ev.currentTarget.value) < 0 || parseInt(ev.currentTarget.value) > 59) {
            return alert("enter minutes value in range of 00 to 59")
        }
        this.setState({
            reminderMinute: parseInt(ev.currentTarget.value)
        });
    }

    handleSubmit = (ev) => {
        ev.stopPropagation();
        if (this.state.reminderText === "" || this.state.reminderHour === "" || this.state.reminderMinute === "") {
            alert("please enter valid details")
            return
        }
        const reminder = {
            id: this.props.mode === "UP" ? this.props.reminder.id : uniqid(),
            description: this.state.reminderText,
            reminderHour: this.state.reminderHour,
            reminderMinute: this.state.reminderMinute,
            color: colors[this.state.color]
        }
        if (this.props.mode === "UP") {
            this.props.dispatch(reminderAction.updateReminder(reminder, this.props.gridId));
        } else {
            this.props.dispatch(reminderAction.saveReminder(reminder, this.props.gridId));
        }
        this.props.handleClose()
    }

    updateColor = (key) => {
        this.setState({ color: key });
    }

    render() {
        return (
            <Dialog
                title="Reminder Detail"
                modal={true}
                hasCloseIcon={false}
                buttons={
                    [{
                        text: "Close",
                        onClick: (ev) => this.handleClose(ev)
                    }, {
                        text: "Sumbit",
                        onClick: (ev) => this.handleSubmit(ev)
                    }]
                }>
                <div onClick={ev => ev.stopPropagation()}>
                    <label>Reminder Text:</label>
                    <input value={this.state.reminderText} onChange={this.handleReminderText} type="text" name="reminderText"></input><br></br>
                    <label>Reminder Time:</label>
                    <input style={{ width: 30 }} value={this.state.reminderHour} onChange={this.handleReminderHour} type="number" name="reminderTime"></input><span>{" / "}</span>
                    <input style={{ width: 30 }} value={this.state.reminderMinute} onChange={this.handleReminderMinutes} type="number" name="reminderTime"></input><br></br>
                    <ReminderColorPicker updateColor={this.updateColor} gridId={this.props.gridId} />
                </div>
            </Dialog>
        )
    }
}


export default connect(null, null)(ReminderDialog);



