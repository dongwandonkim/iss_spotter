const {nextISSTimesForMyLocation} = require('./iss-promise');

nextISSTimesForMyLocation()
  .then((times) => {
    for (let time of times) {
      let timeFormat = Date(time.risetime);
      console.log(`Next pass at ${timeFormat} for ${time.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log('Nope: ', error.message);
  });
