import './Home.css';
import React, { Component } from "react";
import { default as ReactSelect, components } from "react-select";
import { getData } from "../api/sendHttpRequests";
import { Link } from 'react-router-dom';

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
            optionSelected: null
        };
    }

    handleChange = (selected) => {
        this.setState({
            optionSelected: selected
        });
    };

    render() {
        var user_name = "test";
        var user_details = getData("http://localhost:3001/user_details");
        console.log("user details: " + user_details);

        return (
            <div className="body">

                <h1>Welcome {user_name}!</h1>
                <br />
                <div id="websites_visited" className="wrap-flex">
                    <h3>Visited Websites: </h3>
                    <input type="text" disabled />
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
                <Link to="/">Log Out</Link>

            </div>
        )
    }
}

export default Home;
