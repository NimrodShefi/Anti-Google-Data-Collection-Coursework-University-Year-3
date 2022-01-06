const mysql = require('mysql');
var fs = require('fs');
var path = require('path');

// create db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'comsc',
    port: 3306,
    multipleStatements: true
});

function createDatabase() {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        var schemaAndDataPath = path.resolve(__dirname, "../db/schema.sql");
        // loads the scema first, and then the data
        fs.readFile(schemaAndDataPath, function (err, data) {
            if (err) {
                throw err;
            }
            db.query(data.toString(), (err, result) => {
                if (err) {
                    throw err;
                }
            });
        })

        console.log('MySql Connected...');
    });
}

function getUserIdByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM USER WHERE USER.email=" + mysql.escape(email), (err, result) => {
            if (err) {
                throw err;
            }
            var user;
            Object.keys(result).forEach(function (key) {
                var row = result[key];
                user = row;
            });
            return err ? reject(err) : resolve(user);
        });
    });
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM USER WHERE USER.id=" + mysql.escape(id), (err, result) => {
            if (err) {
                throw err;
            }
            var user;
            Object.keys(result).forEach(function (key) {
                var row = result[key];
                user = row;
            });
            return err ? reject(err) : resolve(user);
        });
    });
}

function createUser(first_name, last_name, full_name, email) {
    // check if the user already exists in the DB, if yes, return the existing user ID, if not, craete new user, and return the new user ID
    if (first_name == null) {
        first_name = "";
    }
    if (last_name == null) {
        last_name = "";
    }
    if (full_name == null) {
        full_name = "";
    }
    if (email == null) {
        email = "";
    }
    db.query("SELECT * FROM USER WHERE USER.email=" + mysql.escape(email), (err, result) => { // used this for the mysql.escape(): https://stackoverflow.com/questions/57601777/check-if-email-exists-in-mysql-database-using-nodejs
        if (err) {
            throw err;
        }
        if (!result || result.length < 1) {
            console.log("user doesn't exists");
            db.query("INSERT INTO USER(first_name, last_name, full_name, email) VALUES (" + mysql.escape(first_name) + ", " + mysql.escape(last_name) + ", " + mysql.escape(full_name) + ", " + mysql.escape(email) + ")", (error, res) => {
                if (error) {
                    throw error;
                }
            });
        } else {
            console.log("user exists");
        }
    });
}

function deleteUser(id) {
    db.query("DELETE FROM USER WHERE USER.id=" + mysql.escape(id), (err, result) => {
        if (err) {
            throw err;
        }
    });
}

function getAllWebsites(){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM WEBSITES", (err, result) => {
            if (err) {
                throw err;
            }
            return err ? reject(err) : resolve(result);
        });
    });}

module.exports = { createDatabase, createUser, getUserIdByEmail, getUserById, deleteUser, getAllWebsites }
