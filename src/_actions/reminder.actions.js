import { ReminderConstants } from '../_constants/reminder.constants';

export const reminderAction = {
    registerGrid, saveReminder,
    updateReminder, delete_reminder
};


function registerGrid(grid) {
    return {
        type: ReminderConstants.REGISTER_GRID,
        payload: grid
    }
}

function saveReminder(reminder, gridId) {
    return {
        type: ReminderConstants.SAVE_REMINDER,
        payload: { reminder, gridId }
    }
}

function updateReminder(reminder, gridId) {
    return {
        type: ReminderConstants.UPDATE_REMINDER,
        payload: { reminder, gridId }
    }
}

function delete_reminder(gridId, reminderId) {
    return {
        type: ReminderConstants.DELETE_REMINDER,
        payload: { gridId, reminderId }
    }
}
