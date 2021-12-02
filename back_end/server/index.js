var express = require("express");
var cors = require('cors');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var filestore = require("session-file-store")(expressSession);
var PORT = process.env.PORT || 3001;
var app = express();


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

    verify()
        .then((res) => {
            session = request.session;
            session.first_name = res.given_name;
            session.last_name = res.family_name;
            session.email = res.email;
            session.full_name = res.name;
            session.save();

            response.send({sessionId: session.id});
        })
        .catch(console.error);
});

app.get("/user_details", (request, response) => {
    const jsonFile = require("../sessions/aoqfXhZ19SPIVBGzJLSyj8YQL9lDN98-.json"); // using this: https://forum.freecodecamp.org/t/node-js-session-data-not-persisting/73565, I realised each time I call request.session, I get a different session, therefore, I am going to say exactly which session to use by sending the session name to the server
    session = jsonFile;
    if (session.first_name) {
        var user_details = {
            first_name: session.first_name,
            family_name: session.last_name,
            full_name: session.full_name,
            email: session.email
        }
        response.send(user_details);
    }
});

app.get("/login_status", (request, response) => {
    const jsonFile = require("../sessions/aoqfXhZ19SPIVBGzJLSyj8YQL9lDN98-.json");
    session = jsonFile;
    if (session.first_name) {
        response.send("user logged in");
    } else {
        response.sendStatus(401);
    }
});

app.get("/logout", (request, response) => {
    // request.session.destroy(err => {
    //     if (err) {
    //         return console.log(err);
    //     }
    // })
    response.send("logout");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// used this to help me set up the basic server:
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20
