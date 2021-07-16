

import { ReminderConstants } from '../_constants/reminder.constants';
import { findIndex, sortBy, remove } from 'lodash';

export function reminders(state = { grids: [] }, action) {
    switch (action.type) {

        case ReminderConstants.REGISTER_GRID:
            return {
                ...state,
                grids: [...state.grids, action.payload]
            }
        case ReminderConstants.SAVE_REMINDER:
            let gridIndex = findIndex(state.grids, { id: action.payload.gridId });
            state.grids[gridIndex].reminders = [...state.grids[gridIndex].reminders, action.payload.reminder]
            state.grids[gridIndex].reminders = sortBy(state.grids[gridIndex].reminders, ["reminderHour", "reminderMinute"]);
            return {
                ...state,
                rerender: !state.rerender
            }
        case ReminderConstants.UPDATE_REMINDER:
            const gIndex = findIndex(state.grids, { id: action.payload.gridId });
            let reminders = state.grids[gIndex].reminders;
            const reminderIndex = findIndex(reminders, { id: action.payload.reminder.id });
            if (reminderIndex > -1) {
                reminders[reminderIndex] = action.payload.reminder;
            }
            state.grids[gIndex].reminders = sortBy(reminders, ["reminderHour", "reminderMinute"]);
            return {
                ...state,
                rerender: !state.rerender
            }
        case ReminderConstants.DELETE_REMINDER:
            const gInx = findIndex(state.grids, { id: action.payload.gridId });
            state.grids[gInx].reminders = state.grids[gInx].reminders.length === 1 ? [] : [...state.grids[gInx].reminders.filter(reminder => reminder.id !== action.payload.reminderId)];
            state.grids[gInx].reminders = sortBy(state.grids[gInx].reminders, ["reminderHour", "reminderMinute"]);
            return {
                ...state,
                rerender: !state.rerender
            }
        default:
            return state
    }
}
