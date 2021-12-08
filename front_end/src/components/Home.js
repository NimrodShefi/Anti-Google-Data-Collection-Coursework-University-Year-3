import './Home.css';
import React, { Component } from "react";
import { sendData } from "../api/sendHttpRequests";
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { GoogleLogout } from 'react-google-login';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            req_counter: 0,
            user_name: null
        };
    }

    render() {
        const cookies = new Cookies();
        // should the login cookie not exist, the try will fail, which will activate the catch. In thte catch, the app will reload the login page
        try {
            var user_details = sendData("http://localhost:3001/user_details", cookies.get("session-data").sessionId);

            user_details
                .then(response => {
                    return response.json();
                })
                .then(parsedData => {
                    if (this.state.user_name === null) { // used this: https://reactjs.org/docs/react-component.html#componentdidupdate
                        this.setState({
                            user_name: parsedData.full_name
                        });
                    }
                });

            return (
                <LoggedIn user_name={this.state.user_name} req_counter={this.state.req_counter} successfulGoogleLogout={this.successfulGoogleLogout} failedGoogleLogout={this.failedGoogleLogout} />
            )
        } catch (error) {
            return (
                <Navigate to="/"/>
            )
        }

    }
}

function LoggedIn(props) {

    const user_name = props.user_name;
    const req_counter = props.req_counter;

    const successfulGoogleLogout = (response) => {
        const cookies = new Cookies();
        var data = sendData("http://localhost:3001/logout", cookies.get("session-data").sessionId);
        data
            .then(response => {
                if (response.status === 200) {
                    cookies.remove("session-data");
                    document.getElementById("navigate").click();
                } else {
                    const element = document.getElementById("message");
                    element.innerHTML = "Something went wrong. Please try again later";
                }
            })
    }

    const failedGoogleLogout = (response) => {
        const element = document.getElementById("message");
        element.innerHTML = "Failed Logout. Please try again later";
    }

    return (
        <div className="body">

            <h1 id="welcome_user">Welcome {user_name}!</h1>
            <br />
            <div id="websites_visited" className="wrap-flex">
                <h3>Visited Websites: </h3>
                <input id="request_counter" value={req_counter} type="text" disabled />
            </div>
            <div>
                <GoogleLogout
                    clientId="919197055743-cr391ut1ptdgkaj5e06tb8icgi1477di.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={successfulGoogleLogout}
                    onFailure={failedGoogleLogout}
                />
                <Link id="navigate" to="/" hidden />
                <p id="message"></p>
            </div>

        </div>
    )
}

export default Home;
