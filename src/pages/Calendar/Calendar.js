import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './Calendar.css';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const myEvents = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2018, 7, 0),
    end: new Date(2018, 7, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2018, 7, 7),
    end: new Date(2018, 7, 10),
  },
  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 7, 11),
    end: new Date(2016, 7, 13),
  },
  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 8, 13),
    end: new Date(2016, 8, 13),
  },
  {
    id: 4,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
];
class Calendar extends React.Component {
  state = {
    events: myEvents,
  }
  render() {

    return (
      <div className="Calendar">
        <div className="cal-holder">
          <BigCalendar
            events={this.state.events}
            step={60}
            defaultView='month'
            views={['month']}
            defaultDate={new Date()}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
