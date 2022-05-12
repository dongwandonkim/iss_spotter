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

    const {latidude, longitude} = JSON.parse(body);
    cb(null, {latidude, longitude});
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP};
