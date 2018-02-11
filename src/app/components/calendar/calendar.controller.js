class CalendarController {
  constructor(moment, calendarConfig) {
    'ngInject';

    this.moment = moment;
    this.calendarConfig = calendarConfig;
    this.calendarConfig.dateFormatter = 'moment';

    this.calendarView = 'month';
    this.viewDate = new Date();
    this.cellIsOpen = false;
    this.events = [
      // {
      //   title: 'Introductions and Installs',
      //   color: this.calendarConfig.colorTypes.info,
      //   startsAt: this.moment('Februrary 12, 2018 6:00:00'),
      //   endsAt: this.moment('Februrary 12, 2018 7:00:00'),
      // }
      // , {
      //   title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
      //   color: this.calendarConfig.colorTypes.info,
      //   startsAt: this.moment().subtract(1, 'day').toDate(),
      //   endsAt: this.moment().add(5, 'days').toDate(),
      // }, {
      //   title: 'This is a really long event title that occurs on every year',
      //   color: this.calendarConfig.colorTypes.important,
      //   startsAt: this.moment().startOf('day').add(7, 'hours').toDate(),
      //   endsAt: this.moment().startOf('day').add(19, 'hours').toDate(),
      //   recursOn: 'year',
      // }
    ];
  }

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