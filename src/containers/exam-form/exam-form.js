import React, { Component } from 'react';
import styles from './exam-form.module.css';
import axios from 'axios';
import { connect } from 'react-redux';

import Submitted from './../../components/submitted/submitted';

class form extends Component {

    state = {
        input: {
            name: {
                type: "text",
                placeholder: "Enter Your name",
                value: this.props.name ? this.props.name : ""
            },
            rollno: {
                type: "number",
                placeholder: "Enter Your Roll No",
                value: this.props.rollno ? this.props.rollno : ""
            },
            registration: {
                type: "text",
                placeholder: "Enter Your registration number",
                value: this.props.registration ? this.props.registration.trim() : ""
            },
            email: {
                type: "email",
                placeholder: "Enter Your email",
                value: ""
            },
            password: {
                type: "password",
                placeholder: "choose a password",
                value: ""
            },
        },
        processing: false,
        showProcessing: false,
        obj: {}
    }



    render() {

        let content = Object.keys(this.state.input).map(e => {
            let input = this.state.input[e];
            return (
                <tr className = {styles.inputContainer}>
                    <td className = {styles.inputName}>
                        {e}
                    </td>
                    <td className = {styles.inputValue}>
                        <input onChange = {(event) => this.inputChangedHandler(event, e)} type = {input.type} value = {input.value} placeholder = {input.placeholder}/>
                    </td>
                </tr>
            )
        })

        let mainContent = !this.state.showProcessing ? (<div className = {styles.container}>
                <h2>COPY OF EXAM SHEETS</h2>
                <h6>Fill this form to get digital copy of your exam sheets</h6>
                <table className = {styles.table}>
                    {content}
                </table>
                        <div className = {styles.button} onClick = {this.clickedHandler}>
                            SUBMIT
                        </div>
            </div>) : <h1>Processing...</h1>
        return (!this.state.processing ? mainContent : <Submitted {...this.state.obj}/>);

    }

    clickedHandler = () => {
        let obj = {
            name: this.state.input.name.value,
            email: this.state.input.email.value,
            rollno: this.state.input.rollno.value,
            password: this.state.input.password.value,
        }
        this.setState({ showProcessing: true })
        let course = this.props.match.params.course
        axios.post(`https://college-2d3b0.firebaseio.com/${course}/form.json`, obj)
            .then(e => {
                this.setState({ processing: true, obj: { ...obj, id: e.data.name } })
            })
    }

    inputChangedHandler = (event, el) => {

        this.setState({
            input: {
                ...this.state.input,
                [el]: {
                    ...this.state.input[el],
                    value: event.target.value
                }
            }
        })

    }
}

const mapStateToProps = state => {

    if (state.student && state.student.profile)
        return {
            name: state.student.profile.name,
            registration: state.student.profile.registration,
            father: state.student.profile.father,
            rollno: state.student.profile.rollno
        }
    else
        return {}
}

export default connect(mapStateToProps)(form)
