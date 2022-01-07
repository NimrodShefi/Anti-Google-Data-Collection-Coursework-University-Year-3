import './Home.css';
import React, { Component } from 'react';
import { sendData, decryptData } from '../api/sendHttpRequests';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { GoogleLogout } from 'react-google-login';
import * as VARIABLES from '../VARIABLES';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            req_counter: 0,
            user_name: null,
        };
    }

    render() {
        const cookies = new Cookies();
        // should the login cookie not exist, the try will fail, which will activate the catch. In thte catch, the app will reload the login page
        try {
            var user_details = sendData('http://localhost:3001/user_details', cookies.get('session-data').sessionId);

            user_details
                .then(response => {
                    return response.json();
                })
                .then(parsedData => {
                    if (this.state.user_name === null) { // used this: https://reactjs.org/docs/react-component.html#componentdidupdate
                        this.setState({
                            user_name: decryptData(parsedData.full_name),
                            req_counter: decryptData(parsedData.currentRequests)
                        });
                    }
                });

            return (
                <LoggedIn user_name={this.state.user_name} req_counter={this.state.req_counter} successfulGoogleLogout={this.successfulGoogleLogout} failedGoogleLogout={this.failedGoogleLogout} />
            )
        } catch (error) {
            return (
                <Navigate to='/' />
            )
        }
    }
}

function webRequests(apiTimeout) {
    const cookies = new Cookies();
    try { // used this to help me: https://stackoverflow.com/questions/46140764/polling-api-every-x-seconds-with-react/63134447#63134447
        sendData('http://localhost:3001/send_request', cookies.get('session-data').sessionId)
            .then(res => {
                if (res.status === 200) { // if the request was successfull
                    document.getElementById('request_counter').value++;
                    if (!VARIABLES.web_req_status_button) { // if the user wants to continue --> have to check for false and not true, as when I am changin teh buttons, those are the values I'm using
                        apiTimeout = setTimeout(() => {
                            webRequests(apiTimeout)
                        }, 5000);
                    } else {
                        clearTimeout(apiTimeout);
                    }
                } else if (res.status === 402) {
                    clearTimeout(apiTimeout);
                    startWebRequest();
                    document.getElementById("status_message").innerHTML = "subscription plan ended. Please logout";
                }
                else {
                    clearTimeout(apiTimeout);
                }
            });
    } catch (error) {

    }

}

function startWebRequest() {
    var button = document.getElementById('web_requests_status');
    if (button.value === 'false') {
        changeValue(button, 'green', 'Start Process', true);
    } else {
        changeValue(button, 'red', 'Pause Process', false);
        let apiTimeout = setTimeout(() => {
            webRequests(apiTimeout)
        }, 10000);
    }
}

function changeValue(button, backgroundColor, buttonText, buttonStatus) {
    button.style.backgroundColor = backgroundColor;
    button.innerText = buttonText;
    VARIABLES.setWebReqStatusButton(buttonStatus);
    button.value = VARIABLES.web_req_status_button;
}

function LoggedIn(props) {

    const user_name = props.user_name;
    const req_counter = props.req_counter;

    const successfulGoogleLogout = (response) => {
        const cookies = new Cookies();
        var data = sendData('http://localhost:3001/logout', cookies.get('session-data').sessionId);
        data
            .then(response => {
                if (response.status === 200) {
                    cookies.remove('session-data');
                    document.getElementById('navigate').click();
                } else {
                    const element = document.getElementById('logout_message');
                    element.innerHTML = 'Something went wrong. Please try again later';
                }
            })
    }

    const failedGoogleLogout = (response) => {
        const element = document.getElementById('logout_message');
        element.innerHTML = 'Failed Logout. Please try again later';
    }

    return (
        <div className='body'>

            <h1 id='welcome_user'>Welcome {user_name}!</h1>
            <br />

            <div className='left'>
                <div id='websites_visited' className='wrap-flex'>
                    <h3>Visited Websites: </h3>
                    <input id='request_counter' value={req_counter} type='text' aria-label='request counter' disabled />
                </div>
                <div aria-label='logout section'>
                    <GoogleLogout
                        clientId='919197055743-cr391ut1ptdgkaj5e06tb8icgi1477di.apps.googleusercontent.com'
                        buttonText='Logout'
                        onLogoutSuccess={successfulGoogleLogout}
                        onFailure={failedGoogleLogout}
                        alt='logout button'
                    />
                    <Link id='navigate' to='/' hidden />
                    <p id='logout_message' aria-label='logout status'></p>
                </div>
            </div>

            <div className='right'>
                <div className='status_button'>
                    <button id='web_requests_status' aria-label='web request status button' onClick={startWebRequest}>Start Process</button>
                </div>
                <div className='status_msg'>
                    <p id='status_message' aria-label='web requests status'></p>
                </div>
            </div>

        </div>
    )
}

export default Home;
