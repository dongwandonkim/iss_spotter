const request = require('request-promise-native');

const fetchMyIP = () => {
  return request.get('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = (ip) => {
  const parsedIp = JSON.parse(ip).ip;
  return request.get(`https://api.ipbase.com/json/${parsedIp}`);
};
const fetchISSFlyOverTimes = (coords) => {
  // const {latitude, longitude} = JSON.parse(coords);
  const {latitude, longitude} = {
    latitude: 49.29270935058594,
    longitude: -123.04773712158203,
  };

  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    })
    .catch((err) => console.log(err));
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
