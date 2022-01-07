var express = require("express");
var cors = require('cors');
var PORT = process.env.PORT || 3001;
var app = express();
const gooelApi = require("./API/googleAPI");
const databaseApi = require("./API/databaseAPI");
var cron = require('node-cron');

// call the create DB function, which will reset the DB. This is done, becuase in the end of the day, the plan with the back end, is that it will continue to run all the time.
databaseApi.createDatabase();

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

var dbMax = 0;

function getDbMax(websiteList) {
    dbMax = websiteList.length;
}

// used this: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/user_login", (request, response) => {
    var token = decryptData(request.body.info);

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
            console.log("user verified");
            databaseApi.createUser(res.given_name, res.family_name, res.name, res.email, 2, 0);
            setTimeout(() => {
                var user = databaseApi.getUserByEmail(res.email);
                user.then(data => {
                    response.send({ sessionId: encryptData(data.id) });
                });
            }, 1000)
        })
        .catch(console.error);
});

app.post("/user_details", (request, response) => {
    var user = databaseApi.getUserById(decryptData(request.body.info));
    user.then(data => {
        var user_details = {
            first_name: encryptData(data.first_name),
            family_name: encryptData(data.last_name),
            full_name: encryptData(data.full_name),
            email: encryptData(data.email),
            maxRequests: encryptData(data.maxRequests),
            currentRequests: encryptData(data.currentRequests)
        }
        console.log("user details sent");
        response.send(user_details);
    })
});

app.post("/send_request", (request, response) => {
    var user = databaseApi.getUserById(decryptData(request.body.info));
    var websitesList = databaseApi.getAllWebsites();
    user.then(userData => {
        if (userData.maxRequests > userData.currentRequests) {
            websitesList.then(websites => {
                getDbMax(websites); // this is put here, for when the option to add websites to the database is added to the application, and DB may be updated while users use the app
                var randNum = generateRandomNumber(0, dbMax - 1);
                var word = websites[randNum].search;
                var data = gooelApi.getData("https://www.google.com/search?q=" + word);
                data
                    .then(res => {
                        if (res === 200) {
                            console.log("sent word: " + word);
                            databaseApi.updateCurrentRequests(userData.id);
                            response.status(200).send(encryptData(word));
                        } else {
                            console.log("request to send word :" + word + " faild");
                            response.status(500).send(encryptData("fail"));
                        }
                    });
            });
        } else {
            console.log("reached user limit");
            response.status(402).send(encryptData("subscription ended"));
        }
    });
});

// app.post("/logout", (request, response) => {
//     try {
//         databaseApi.deleteUser(decryptData(request.body.info));
//         response.status(200).send(encryptData("logout"));
//     } catch (error) {
//         console.log(error);
//         response.status(500).send(encryptData(error));
//     }
// });

// create timer to delete all users from the database at the end of a day. This is done to ensure that a user can't logout and relogin and restart his daily subscription. He has to wait until the next day
// used these 2 websites:
// 1) https://github.com/ncb000gt/node-cron
// 2) https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
cron.schedule('0 0 * * *', () => {
    // all users will be deleted at midnight every day.
    databaseApi.deleteAllUsers();
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// used this to help me set up the basic server:
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20

function encryptData(data) {
    var CryptoJS = require("crypto-js");
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();

    return ciphertext;
}

function decryptData(data) {
    var CryptoJS = require("crypto-js");
    var bytes = CryptoJS.AES.decrypt(data, 'my-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
}
