import React, { Component } from 'react';
import { colors } from '../../../_helpers/calender_halpers';


class ReminderColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "blue"
        }
    }

    handleColorChange = (ev, key) => {
        ev.stopPropagation();
        this.setState({ current: key });
        this.props.updateColor(key);
    }

    render() {

        return <div style={{ marginTop: 15 }}>
            <label>Choose reminder color:</label>
            {Object.keys(colors).map((key, index) => <span key={index} className={this.state.current === key ? "selected_color_picker" : "color_picker"} onClick={ev => this.handleColorChange(ev, key)} style={{ backgroundColor: `${colors[key]}` }}>{key}</span>)}
        </div>
    }
}

export default ReminderColorPicker;