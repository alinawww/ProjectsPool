import React, { Component } from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox, Select } from 'react-form';

const teamSizeOptions = [
    {
      label: 'small',
      value: '< 6',
    },
    {
      label: 'medium',
      value: '6 - 12',
    },
    {
      label: "large",
      value: '12 - 20',
    },
    {
      label: "xlarge",
      value: '> 20',
    },
    {
      label: "nan",
      value: 'N/A',
    },
  ]

class AddProjectForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            team_size: '',
            amount: '',
            location: '',
            cultural_values: '',
            type_of_activity: '',
            duration: '',
            repeats: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let newState = {};

        newState[e.target.name] = e.target.value;

        this.setState(newState);
    }

    handleSubmit = (e, message) => {
        e.preventDefault();

        const formData = {
            formName: this.state.name,
            formTeamSize: this.state.team_size,
            formAmount: this.state.amount,
            formLocation: this.state.location,
            formCulturalValues: this.state.cultural_values,
            formTypeOfActivity: this.state.type_of_activity,
            formDuration: this.state.duration,
            formRepeats: this.state.repeats,
            formDescription: this.state.description
        }

        console.log('formData', formData);
        // if (formData.formLastName.length < 1 || formData.formEmail.length < 1 || formData.formFirstName.length < 1) {
        //     return false;
        // }
    }

    render() {
        return (
            <Form onSubmit={this.submit} render={({ submitForm, values, addValue, removeValue }) => (
                <form onSubmit={submitForm}>

                <label htmlFor="name">{"What is the name of the proposed activity?"}</label>
                <Text field="name" placeholder="Activity name" />
                <br/>
                <label htmlFor="description">{"Describe a bit the activity"}</label>
                <Text field="description" placeholder="Activity name" />
                <br/>
                <label htmlFor="teamSize">{"For which team size is it adequate"}</label>
                <Select field="teamSize" id="teamSize" options={teamSizeOptions} />

                <br/>
                <button type="submit">Submit</button>
                </form>
            )}
            />
        )
    }
}

export default AddProjectForm
