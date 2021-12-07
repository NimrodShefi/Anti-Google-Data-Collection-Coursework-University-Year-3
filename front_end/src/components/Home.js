import './Home.css';
import React, { Component } from "react";
import { default as ReactSelect, components } from "react-select";
import { sendData } from "../api/sendHttpRequests";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { GoogleLogout } from 'react-google-login';

// used this: https://medium.com/geekculture/creating-multi-select-dropdown-with-checkbox-in-react-792ff2464ef3#:~:text=%20Creating%20Multi-select%20Dropdown%20with%20Checkbox%20in%20React,Step%203%3A%20Define%20your%20data%20object%20More%20
// to create the checkbox select bar
const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

export const topicOptions = [
    { value: "countries1", label: "Countries1" },
    { value: "countries2", label: "Countries2" },
    { value: "countries3", label: "Countries3" },
    { value: "countries4", label: "Countries4" },
    { value: "countries5", label: "Countries5" }
];

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionSelected: null,
            req_counter: 0,
            user_name: null
        };
    }

    handleChange = (selected) => {
        this.setState({
            optionSelected: selected
        });
    };

    successfulGoogleLogout = (response) => {
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

    failedGoogleLogout = (response) => {
        const element = document.getElementById("message");
        element.innerHTML = "Failed Logout. Please try again later";
    }

    readData = (res) => {
        if (this.state.user_name === null) {
            this.setState({
                user_name: res.full_name
            });
        }
    }

    render() {
        const cookies = new Cookies();
        // console.log(cookies.get("session-data").sessionId);
        // console.log(sendData("http://localhost:3001/login_status", cookies.get("session-data").sessionId));

        var user_details = sendData("http://localhost:3001/user_details", cookies.get("session-data").sessionId);

        user_details
            .then(response => {
                return response.json();
            })
            .then(parsedData => {
                this.readData(parsedData);
            });

        return (
            <div className="body">

                <h1 id="welcome_user">Welcome {this.state.user_name}!</h1>
                <br />
                <div id="websites_visited" className="wrap-flex">
                    <h3>Visited Websites: </h3>
                    <input id="request_counter" value={this.state.req_counter} type="text" disabled />
                </div>
                <div id="website_topics" className="wrap-flex">
                    <h3>Website Topics To Visit: </h3>
                    <span
                        className="d-inline-block"
                        data-toggle="popover"
                        data-trigger="focus"
                        data-content="Please selecet account(s)"
                    >
                        <ReactSelect
                            id="select"
                            options={topicOptions}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                                Option
                            }}
                            onChange={this.handleChange}
                            allowSelectAll={true}
                            value={this.state.optionSelected}
                        />
                    </span>
                </div>
                <div>
                    <GoogleLogout
                        clientId="919197055743-cr391ut1ptdgkaj5e06tb8icgi1477di.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={this.successfulGoogleLogout}
                        onFailure={this.failedGoogleLogout}
                    />
                    <Link id="navigate" to="/" hidden />
                    <p id="message"></p>
                </div>

            </div>
        )
    }
}



export default Home;
