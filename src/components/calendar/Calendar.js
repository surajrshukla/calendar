import React, { Component } from 'react';
import { month, getDaysInMonth } from '../../_helpers/calender_halpers';
import CalendarHeader from './CalendarHeader';
import CalendarGridHeader from './CalendarGridHeader';
import CalendarGrid from './CalendarGrid';
import { connect } from 'react-redux';
import { calendarAction } from '../../_actions/calendar.actions';


import './calendar.css';

class Calendar extends Component {
    componentDidMount() {
        this.props.dispatch(calendarAction.create_calendar())
    }

    getDaysInLastMonth = () => {
        const lastMonth = month.indexOf(this.props.currentMonthDetail.currentMonth) === 0 ? 12 : month.indexOf(this.props.currentMonthDetail.currentMonth) - 1;
        const lastYear = month.indexOf(this.props.currentMonthDetail.currentMonth) === 0 ? this.props.currentMonthDetail.currentYear - 1 : this.props.currentMonthDetail.currentYear;
        const daysinLastMonth = getDaysInMonth(lastYear, lastMonth);
        return daysinLastMonth
    }

    createDaysForCurrentMonth = () => {
        const currenntMonthDays = Array.from(Array(this.props.currentMonthDetail.daysInCurrentMonth).keys()).map((day, index) => {
            const gridId = Date.now();
            return {
                id: gridId,
                date: `${day + 1} ${this.props.currentMonthDetail.currentMonth} ${this.props.currentMonthDetail.currentYear}`,
                dayOfMonth: day + 1,
                isCurrentMonth: true,
                reminders: []
            };
        });
        return currenntMonthDays;
    }

    render() {
        if (Object.keys(this.props.currentMonthDetail).length === 0 && this.props.currentMonthDetail.constructor === Object) return <div>Loading...</div>
        return (
            <div className="calendar_month">
                <CalendarHeader currentMonth={this.props.currentMonthDetail.currentMonth} currentYear={this.props.currentMonthDetail.currentYear} />
                <CalendarGridHeader />
                <ol className="days_grid">
                    {this.props.currentMonthDetail.days.map((day, index) => {
                        return <CalendarGrid key={index} day={day} />
                    })}
                </ol>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const currentMonthDetail = state.calendar.currentMonthDetail ? state.calendar.currentMonthDetail : {}
    return {
        currentMonthDetail
    };
}

export default connect(mapStateToProps, null)(Calendar);