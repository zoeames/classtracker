import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import calRequests from '../../../helpers/data/calRequests';

import './Calendar.scss';

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  state = {
    events: [],
    selectedEvents: [],
  };

  componentDidMount() {
    calRequests
      .getCalEventsRequest()
      .then((events) => {
        const newEvents = [];
        events.forEach((event) => {
          const newEvent = {
            description: event.description,
            eventType: event.eventType,
            githubRepo: event.githubRepo,
            hwUrl: event.hwUrl,
            id: event.id,
            instructor: event.instructor,
            resourceUrl: event.resourceUrl,
            title: event.title,
          };
          newEvent.start = new Date(event.start);
          newEvent.end = new Date(event.end);
          newEvents.push(newEvent);
        });
        this.setState({ events: newEvents });
      })
      .catch(err => console.error('error with get events request', err));
  }

  eventStyleGetter = (event) => {
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
      backgroundColor,
      borderRadius: '10px',
      border: '1px solid black',
      opacity: 0.8,
      color: 'black',
      display: 'block',
    };
    return { style };
  };

  selectDate = (slotInfo) => {
    const startDate = new Date(slotInfo.end);
    const startTime = startDate.getTime();
    const endTime = startTime + 60 * 60 * 24 * 1000;
    const events = this.state.events.filter((event) => {
      const eventStartDate = new Date(event.start);
      const eventStartTime = eventStartDate.getTime();
      const eventEndDate = new Date(event.end);
      const eventEndTime = eventEndDate.getTime();
      return (
        (startTime > eventStartTime && startTime < eventEndTime)
        || (endTime > eventStartTime && endTime < eventEndTime)
        || (eventStartTime >= startTime && eventStartTime <= endTime)
      );
    });
    this.setState({ selectedEvents: events });
  };

  render() {
    const minTime = new Date();
    const maxTime = new Date();
    minTime.setHours(9, 0, 0);
    maxTime.setHours(22, 0, 0);

    const displaySelectedEvents = this.state.selectedEvents.map((event) => {
      let backgroundClass = '';
      switch (event.eventType) {
        case 'vacation':
          backgroundClass = 'danger';
          break;
        case 'demo':
          backgroundClass = 'purple';
          break;
        case 'lecture':
          backgroundClass = 'primary';
          break;
        case 'study':
          backgroundClass = 'success';
          break;
        default:
          backgroundClass = 'secondary';
      }

      return (
        <div key={event.id} className="event col-md-4">
          <div className={`card col-xs-4 border border-${backgroundClass}`}>
            <div className={`card-header bg-${backgroundClass}`}>
              {event.title}
            </div>
            <div className="card-body">
              {event.instructor.length > 0 ? (
                <div>
                  <strong>Instructor:</strong> {event.instructor}
                </div>
              ) : (
                ''
              )}
              <div>
                <strong>Description:</strong> {event.description}
              </div>
              {event.resourceUrl.length > 0 ? (
                <div>
                  Resource{' '}
                  <a href={event.resourceUrl} target="_blank" rel="noopener noreferrer">
                    Here
                  </a>
                </div>
              ) : (
                ''
              )}
              {event.githubRepo.length > 0 ? (
                <div>
                  Github{' '}
                  <a href={event.githubRepo} target="_blank" rel="noopener noreferrer">
                    Here
                  </a>
                </div>
              ) : (
                ''
              )}
              {event.hwUrl.length > 0 ? (
                <div>
                  HW{' '}
                  <a href={event.hwUrl} target="_blank" rel="noopener noreferrer">
                    Here
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="Calendar">
        <h1>Course Calendar</h1>
        <div className="cal-holder">
          <BigCalendar
            localizer={localizer}
            selectable
            events={this.state.events}
            step={60}
            defaultView="week"
            views={['week']}
            min = {minTime}
            max = {maxTime}
            eventPropGetter={this.eventStyleGetter}
            onSelectSlot={this.selectDate}
          />
        </div>
        <div className="d-flex flex-wrap">{displaySelectedEvents}</div>
      </div>
    );
  }
}

export default Calendar;
