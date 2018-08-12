import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import calRequests from '../../firebaseRequests/cal';

import './Calendar.css';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  state = {
    events: [],
  };

  componentDidMount() {
    calRequests
      .getCalEventsRequest()
      .then(events => {
        this.setState({ events });
      })
      .catch(err => {
        console.error('error with get events request', err);
      });
  }

  eventStyleGetter = event => {
    let backgroundColor = '';

    switch (event.eventType) {
    case 'vacation':
      backgroundColor = '#dc3545';
      break;
    case 'demo':
      backgroundColor = '#6f42c1';
      break;
    case 'lecture':
      backgroundColor = '#007bff';
      break;
    case 'study':
      backgroundColor = '#28a745';
      break;
    default:
      backgroundColor = '#6c757d';
    }

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '10px',
      border: '1px solid black',
      opacity: 0.8,
      color: 'black',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  render() {
    return (
      <div className="Calendar">
        <div className="cal-holder">
          <BigCalendar
            events={this.state.events}
            step={60}
            defaultView="month"
            views={['month']}
            defaultDate={new Date()}
            eventPropGetter={this.eventStyleGetter}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
