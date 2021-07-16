import React from 'react';
import Dialog from 'react-dialog';

const ReminderPopup = (props) => {
    function handleClose(ev) {
        ev.stopPropagation()
        props.handleCloseReminderPopup()
    }
    return <Dialog
        title="Reminders"
        modal={true}
        hasCloseIcon={false}
        buttons={
            [{
                text: "Close",
                onClick: (ev) => handleClose(ev)
            }]
        }>
        <div onClick={ev => ev.stopPropagation()}>
            {props.children}
        </div>
    </Dialog>
}


export default ReminderPopup;