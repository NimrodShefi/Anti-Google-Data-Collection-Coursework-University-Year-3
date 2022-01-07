import './Login.css';
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { sendLoginData } from "../api/sendHttpRequests";
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export class Login extends Component {

    failedResponseGoogle = (response) => {
        const element = document.getElementById("message");
        element.innerHTML = "Login failed! Please try again later";
    }

    successfulResponseGoogle = (response) => {
        try {
            const cookies = new Cookies();
            var session_data = sendLoginData("http://localhost:3001/user_login", response.tokenId);
            session_data
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(parsedData => {
                    cookies.set("session-data", parsedData, { path: "/" });
                });
            setTimeout(() => {
                document.getElementById("navigate").click();
            }, 500); // the server waits 500 milliseconds before clicking the link to ensure that the sendData method finishes running completely before loading the next page
        } catch (error) {
            const element = document.getElementById("message");
            element.innerHTML = "Login failed! Please try again later";
            console.error(error);
        }
    }

    render() {
        const cookies = new Cookies();
        try {
            // if there is no error, the cookie exists, it means that the user is already logged in, and he should be taken to the home page, rather then be asked if he wants to re-log in
            var try_cookie = cookies.get('session-data').sessionId;
            return (
                <Navigate to='/home' />
            )
        // if there is an error, it means that the cookie was not found, and thereofre the user is not logged in, and before being allowed to use the app, he needs to log in
        } catch (error) {
            return (
                <div>
                    <div id="app_details">
                        <h1>Data Protector</h1>
                        <p>By logging in to your Google Account here, you are able to provide yourself increased privacy from Google's alogirthm by letting us visit many website under your name.
                            To ensure that you are completely comfortable in using our services, you are able to opt out of us loading some of the webistes on the list if you don't want.
                            <br /><br />
                            In addition to that, to ensure your privacy, the moment you close the app, all the data stored about you in our systems will be deleted, unless you decide otherwise.</p>
                    </div>

                    <div id="app_login" aria-label='login section'>
                        <GoogleLogin
                            clientId="919197055743-cr391ut1ptdgkaj5e06tb8icgi1477di.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.successfulResponseGoogle}
                            onFailure={this.failedResponseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <p id="message" aria-label='login status'></p>
                        <Link id="navigate" to="/home" hidden />
                    </div>
                </div>
            )
        }

    }
}


export default Login;

// Used this youtube tutorial to help me create the google login:
// https://www.youtube.com/watch?v=-OgU5EAcQmo