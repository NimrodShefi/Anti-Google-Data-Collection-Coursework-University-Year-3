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
            reqCounter: 0,
            userName: null,
        };
    }

    render() {
        const cookies = new Cookies();
        // should the login cookie not exist, the try will fail, 
        // which will activate the catch. In thte catch, the app will reload the login page
        try {
            var userDetails = sendData('http://localhost:3001/user_details', cookies.get('session-data').sessionId);

            userDetails
                .then(response => {
                    return response.json();
                })
                .then(parsedData => {
                    if (this.state.userName === null) { // used this: https://reactjs.org/docs/react-component.html#componentdidupdate
                        this.setState({
                            userName: decryptData(parsedData.full_name),
                            reqCounter: decryptData(parsedData.currentRequests)
                        });
                    }
                });

            return (
                <LoggedIn userName={this.state.userName} reqCounter={this.state.reqCounter} 
                successfulGoogleLogout={this.successfulGoogleLogout} failedGoogleLogout={this.failedGoogleLogout} />
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
                    document.getElementById('requestCounter').value++;
                    // if the user wants to continue --> 
                    // have to check for false and not true, as when I am changin teh buttons, those are the values I'm using
                    if (!VARIABLES.webReqStatusButton) { 
                        apiTimeout = setTimeout(() => {
                            webRequests(apiTimeout)
                        }, 5000);
                    } else {
                        clearTimeout(apiTimeout);
                    }
                } else if (res.status === 402) {
                    clearTimeout(apiTimeout);
                    startWebRequest();
                    document.getElementById('statusMessage').innerHTML = 'subscription plan ended. Please logout';
                }
                else {
                    clearTimeout(apiTimeout);
                }
            });
    } catch (error) {

    }

}

function startWebRequest() {
    var button = document.getElementById('webRequestsStatus');
    if (button.value === 'false') {
        ChangeValue(button, 'green', 'Start Process', true);
    } else {
        ChangeValue(button, 'red', 'Pause Process', false);
        let apiTimeout = setTimeout(() => {
            webRequests(apiTimeout)
        }, 10000);
    }
}

function ChangeValue(button, backgroundColor, buttonText, buttonStatus) {
    button.style.backgroundColor = backgroundColor;
    button.innerText = buttonText;
    VARIABLES.setWebReqStatusButton(buttonStatus);
    button.value = VARIABLES.webReqStatusButton;
}

function LoggedIn(props) {

    const userName = props.userName;
    const reqCounter = props.reqCounter;

    const successfulGoogleLogout = (response) => {
        const cookies = new Cookies();
        try {
            cookies.remove('session-data');
            document.getElementById('navigate').click();
        } catch (error) {
            const element = document.getElementById('logoutMessage');
            element.innerHTML = 'Something went wrong. Please try again later';
        }
    }

    const failedGoogleLogout = (response) => {
        const element = document.getElementById('logoutMessage');
        element.innerHTML = 'Failed Logout. Please try again later';
    }

    return (
        <div className='body'>

            <h1 id='welcomeUser'>Welcome {userName}!</h1>
            <br />

            <div className='left'>
                <div id='websitesVisited' className='wrap-flex'>
                    <h3>Visited Websites: </h3>
                    <input id='requestCounter' value={reqCounter} type='text' aria-label='request counter' disabled />
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
                    <p id='logoutMessage' aria-label='logout status'></p>
                </div>
            </div>

            <div className='right'>
                <div className='statusButton'>
                    <button id='webRequestsStatus' aria-label='web request status button' onClick={startWebRequest}>Start Process</button>
                </div>
                <div className='statusMsg'>
                    <p id='statusMessage' aria-label='web requests status'></p>
                </div>
            </div>

        </div>
    )
}

export default Home;