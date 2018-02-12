export const calServiceName = 'calService';

export default class calService {
  constructor($http, $q, FIREBASE_CONFIG) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
    this.FB = FIREBASE_CONFIG;
  }

  getcalEvents() {
    const events = [];
    return this.$q((resolve, reject) => {
      this.$http.get(`${this.FB.databaseURL}/cal.json`)
        .then((calObject) => {
          const calCollection = calObject.data;
          Object.keys(calCollection).forEach((key) => {
            calCollection[key].id = key;
            events.push(calCollection[key]);
          });
          resolve(events);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}