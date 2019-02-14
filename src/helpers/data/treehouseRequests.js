import axios from 'axios';

const getTreehouseProfilePoints = url => new Promise((resolve, reject) => {
  axios
    .get(`${url}.json`)
    .then((treehouseProfile) => {
      let points = treehouseProfile.data.points.total;
      if (points > 3000) {
        points = 'done';
      }
      resolve(points);
    })
    .catch(err => reject(err));
});

export default { getTreehouseProfilePoints };
