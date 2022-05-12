const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request.get('https://api.ipify.org?format=json', (err, res, body) => {
    if (err) return callback(err, null);

    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipData = JSON.parse(body);
    callback(null, ipData.ip);
  });
};

const fetchCoordsByIP = (ip, cb) => {
  request.get(`https://api.ipbase.com/json/${ip}`, (err, res, body) => {
    if (err) return cb(err, null);

    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching coordinates for IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }

    const {latitude, longitude} = JSON.parse(body);
    cb(null, {latitude, longitude});
  });
};

// https://iss-pass.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, cb) {
  const {latitude, longitude} = coords;

  request.get(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`,
    (err, res, body) => {
      if (err) return cb(err, null);

      // if non-200 status, assume server error
      if (res.statusCode !== 200) {
        const msg = `Status Code ${res.statusCode} when fetching  ISS Fly over time for your coordinates. Response: ${body}`;
        cb(Error(msg), null);
        return;
      }

      const {response} = JSON.parse(body);
      cb(null, response);
    }
  );
};

const nextISSTimesForMyLocation = (cb) => {
  fetchMyIP((err, ip) => {
    if (err) return cb(err, null);

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return cb(err, null);

      fetchISSFlyOverTimes(coords, (err, times) => {
        if (err) return cb(err, null);
        cb(null, times);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
