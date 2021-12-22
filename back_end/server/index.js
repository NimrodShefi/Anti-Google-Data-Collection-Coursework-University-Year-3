var express = require("express");
var cors = require('cors');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var fs = require('fs');
var path = require('path');
var filestore = require("session-file-store")(expressSession);
var PORT = process.env.PORT || 3001;
var app = express();
const api = require("./googleAPI");

// Google Auth
// used this: https://www.youtube.com/watch?v=Y2ec4KQ7mP8
// and this: https://developers.google.com/identity/sign-in/web/backend-auth
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '919197055743-cr391ut1ptdgkaj5e06tb8icgi1477di.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Authorising whos allowed to access the server, removing the CORS errors
var whitelist = ['http://localhost:3000', 'http://localhost:3001']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));

// used this: https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
// this allows the app to send json data across the front and back ends
app.use(express.json());

// this will be used to keep the user logged in through the user access token
app.use(cookieParser());

app.use(expressSession({
    name: "user_details_session",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    resave: false,
    store: new filestore()
}));

var session;
var dbMax = 0;

function getDbMax(params) {
    const db = require("../server/websites.json");
    dbMax = db.length;
}

// used this: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/user_login", (request, response) => {
    var token = request.body.info;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        return payload;
    }

    getDbMax();
    verify()
        .then((res) => {
            var currentTime = Date.now();
            var nextDay = currentTime + 86400000; // add 24 hours to the day
            var dateFormat = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', dateStyle: 'long' });
            var nextDayMidnight = new Date(dateFormat.format(nextDay));
            var finalTimeMilli = Date.parse(nextDayMidnight) - currentTime;

            session = request.session;
            session.cookie = {
                first_name: res.given_name,
                last_name: res.family_name,
                full_name: res.name,
                email: res.email,
                expires: finalTimeMilli
            }
            session.save();

            response.send({ sessionId: session.id });
        })
        .catch(console.error);
});

app.post("/user_details", (request, response) => {
    const jsonFile = require("../sessions/" + request.body.info + ".json");
    session = jsonFile;
    if (session.cookie.first_name) {
        var user_details = {
            first_name: session.cookie.first_name,
            family_name: session.cookie.last_name,
            full_name: session.cookie.full_name,
            email: session.cookie.email
        }
        response.send(user_details);
    }
});

app.post("/send_request", (request, response) => {
    var url = "../sessions/" + request.body.info.sessionId + ".json";
    const jsonFile = require(url);
    const db = require("../server/websites.json");
    var randNum = generateRandomNumber(0, dbMax-1);
    var word = db[randNum].search;
    var data = api.getData("https://www.google.com/search?q=" + word);
    data
        .then(res => {
            if (res === 200) {
                response.status(200).send(word);
            } else {
                response.status(500).send("fail");
            }
        })
});

app.post("/logout", (request, response) => {
    try {
        var url = path.resolve(__dirname, "../sessions/" + request.body.info + ".json"); // used this to successfully get the complete json file path: https://stackoverflow.com/questions/53343722/how-to-dynamically-import-data-in-a-nodejs-app
        fs.unlink(url, function (err) {
            if (err) {
                throw err;
            } else {
                console.log("File Deleted");
                response.status(200).send("logout");
            }
        });
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// used this to help me set up the basic server:
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20
