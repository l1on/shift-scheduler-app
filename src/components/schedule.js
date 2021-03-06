import React, { Component } from 'react';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
  } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            shifts: [],
            employeeName: ""
        };
    }

    fetchShifts(employeeId) {
        Promise.all([
            fetch(`/api/shifts?employeeId=${employeeId}`),
            fetch(`/api/admin/employees/${employeeId}`),
        ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([shifts, employee]) => {
            this.setState({
                isLoaded: true,
                shifts: shifts,
                employeeName: employee.name,
                error: null
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        this.fetchShifts(nextProps.match.params.employeeId);     
    }

    componentDidMount() {
        this.fetchShifts(this.props.match.params.employeeId);
    }

    getShiftDates(shifts) {
        return shifts.map(shift => {
            return shift.schedules.map(weekDay => new Date(2015, 5, (shift.week - 23) * 7 + weekDay))
        }).reduce((a1, a2) => a1.concat(a2), []);
    }

    getNoShiftDates(shiftDates) {  
        const allJuneDates = Array(30).fill().map((_, i) => new Date(2015, 5, i + 1));
        return allJuneDates.filter(anyDate => shiftDates.findIndex(shiftDate => shiftDate - anyDate === 0) === -1);
    }

    render() {
        const { error, isLoaded, shifts, employeeName } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h2>{employeeName}</h2>
                    <InfiniteCalendar
                        displayOptions={{showHeader: false,}}
                        min={new Date(2015, 5, 1)}
                        max={new Date(2015, 5, 30)}
                        locale={{weekStartsOn: 1}}
                        Component={withMultipleDates(Calendar)}
                        interpolateSelection={defaultMultipleDateInterpolation}

                        selected={this.getShiftDates(shifts)}
                        disabledDates={this.getNoShiftDates(this.getShiftDates(shifts))}
                    />
                </div>
            );
        }
    }
}

