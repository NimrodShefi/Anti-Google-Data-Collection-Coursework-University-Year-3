// https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

const axios = require('axios');

function getData(url) {
    var info = axios.get(url)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            console.error("error: " + error);
        });
    return info;
}

module.exports = { getData }