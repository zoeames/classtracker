class CalendarController {
  constructor(moment, calendarConfig, calService) {
    'ngInject';

    this.moment = moment;
    this.calendarConfig = calendarConfig;
    this.calService = calService

    this.calendarView = 'month';
    this.viewDate = new Date();
    this.cellIsOpen = false;
    this.events = [];
  }

  $onInit() {
    this.getEvents();
  }

  getEvents() {
    this.calService.getcalEvents().then((fbEvents) => {
      this.makeCalEvents(fbEvents);
    });
  }

  makeCalEvents(things) {
    things.forEach((calEvent) => {
      calEvent.startsAt = new Date(calEvent.startsAt);
      calEvent.endsAt = new Date(calEvent.endsAt);

      // calendarConfig.colorTypes color options:
      // info: blue
      // important: red
      // warning: yellow
      // inverse: black
      // special: purple
      // success: green
      switch (calEvent.eventType) {
        case 'lecture':
          calEvent.color = this.calendarConfig.colorTypes.info;
          break;
        case 'study':
          calEvent.color = this.calendarConfig.colorTypes.success;
          break;
        case 'vacation':
          calEvent.color = this.calendarConfig.colorTypes.important;
          break;
        case 'demo':
          calEvent.color = this.calendarConfig.colorTypes.special;
          break;
        default:
          calEvent.color = this.calendarConfig.colorTypes.inverse;
      }
    });
    this.events = things;
  }


  // Calendar Stuff
  toggle($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  }

  timespanClicked(date, cell) {
    if ((this.cellIsOpen && this.moment(date).startOf('day').isSame(this.moment(this.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
      this.cellIsOpen = false;
    } else {
      this.cellIsOpen = true;
      this.viewDate = date;
    }
  };
}

export default CalendarController;