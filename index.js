const {nextISSTimesForMyLocation} = require('./iss');

// const coords = {latitude: 49.29270935058594, longitude: -123.04773712158203};

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  // Next pass at Fri Jun 01 2021 19:26:12 GMT-0700 (Pacific Daylight Time) for 643 seconds!
  for (let time of times) {
    let timeFormat = Date(time.risetime);
    console.log(`Next pass at ${timeFormat} for ${time.duration} seconds!`);
  }
});
