const mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var dbConfig = require('../config/config')

// create db connection
const db = mysql.createConnection(dbConfig.config);

function createDatabase() {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        var schemaAndDataPath = path.resolve(__dirname, '../db/schema.sql');
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

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM USER WHERE USER.email=' + mysql.escape(email), (err, result) => {
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
        db.query('SELECT * FROM USER WHERE USER.id=' + mysql.escape(id), (err, result) => {
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

function createUser(firstName, lastName, fullName, email, maxRequests, currentRequests) {
    // check if the user already exists in the DB, if yes, return the existing user ID, if not, craete new user, and return the new user ID
    if (firstName == null) {
        firstName = ' ';
    }
    if (lastName == null) {
        lastName = ' ';
    }
    if (fullName == null) {
        fullName = ' ';
    }
    if (email == null) {
        email = ' ';
    }
    db.query('SELECT * FROM USER WHERE USER.email=' + mysql.escape(email), (err, result) => { // used this for the mysql.escape(): https://stackoverflow.com/questions/57601777/check-if-email-exists-in-mysql-database-using-nodejs
        if (err) {
            throw err;
        }
        if (!result || result.length < 1) {
            console.log('user doesn`t exists');
            db.query('INSERT INTO USER(firstName, lastName, fullName, email, maxRequests, currentRequests) VALUES (' + mysql.escape(firstName) + ', ' + mysql.escape(lastName) + ', ' + mysql.escape(fullName) + ', ' + mysql.escape(email)+ ', ' + mysql.escape(maxRequests) + ', ' + mysql.escape(currentRequests) + ')', (error, res) => {
                if (error) {
                    throw error;
                }
            });
        } else {
            console.log('user exists');
        }
    });
}

function deleteUser(id) {
    db.query('DELETE FROM USER WHERE USER.id=' + mysql.escape(id), (err, result) => {
        if (err) {
            throw err;
        }
        console.log('user deleted from database');
    });
}

function deleteAllUsers() {
    db.query('DELETE FROM USER', (err, result) => {
        if (err) {
            throw err;
        }
        console.log('all users deleted from database');
    });
}

function getAllWebsites(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM WEBSITES', (err, result) => {
            if (err) {
                throw err;
            }
            return err ? reject(err) : resolve(result);
        });
    });
}

function updateCurrentRequests(id){
    db.query('UPDATE USER SET USER.currentRequests=currentRequests+1 WHERE USER.id=' +  mysql.escape(id), (err, result) => {
        if (err) {
            throw err;
        }
        console.log('entry updated');
    });
}

module.exports = { createDatabase, createUser, getUserByEmail, getUserById, deleteUser, getAllWebsites, updateCurrentRequests, deleteAllUsers }