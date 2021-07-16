import { combineReducers } from 'redux';
import { calendar } from './calendar.reducer';
import { reminders } from './reminder.reducer';



const rootReducer = combineReducers({
    calendar, reminders
});

export default rootReducer;