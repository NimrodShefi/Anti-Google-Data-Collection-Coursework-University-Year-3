import './Login.css';
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import {sendHttpRequestJson} from "../api/sendHttpRequests" ;

export class Login extends Component {

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
    }
    successfulResponseGoogle = (response) => {
        sendHttpRequestJson("POST", "/user_login", response);
    }

    render() {
        return (
            <div>
                <div id="app_details">
                    <h1>Application Name</h1>
                    <p>By logging in to your Google Account here, you are able to provide yourself increased privacy from Google's alogirthm by letting us visit many website under your name.
                        To ensure that you are completely comfortable in using our services, you are able to opt out of us loading some of the webistes on the list if you don't want.
                        <br /><br />
                        In addition to that, to ensure your privacy, the moment you close the app, all the data stored about you in our systems will be deleted, unless you decide otherwise.</p>
                </div>

                <div id="app_login">
                    <GoogleLogin
                        clientId="919197055743-cr391ut1ptdgkaj5e06tb8icgi1477di.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.successfulResponseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        )
    }
}

export default Login;

// Used this youtube tutorial to help me create the google login:
// https://www.youtube.com/watch?v=-OgU5EAcQmo