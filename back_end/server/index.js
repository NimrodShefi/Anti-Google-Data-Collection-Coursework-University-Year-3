var express = require("express");
var cors = require('cors');
var PORT = process.env.PORT || 3001;
var app = express();

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

app.use(express.json())

app.get("/user_login", (req, res) => {
    res.json({ message: "This is user login page" });
});

app.post("/user_login", (req, res) => {
    console.log("--------------------------------------------------");
    console.log(res.statusCode);
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


// used this to help me set up the basic server:
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20
