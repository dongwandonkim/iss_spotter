const {fetchMyIP, fetchCoordsByIP} = require('./iss');

fetchMyIP((err, ip) => {
  if (err) return console.log(err);

  fetchCoordsByIP(ip, (err, data) => {
    if (err) return console.log(err);

    console.log(data);
  });
});
