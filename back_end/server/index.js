const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/user_login", (req, res) => {
    console.log(req);
    console.log(res);
    console.log("hello");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});