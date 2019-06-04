import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';

import Profile from './../../containers/profile/profile';
import * as actions from './../../store/actions/index';


class studentResult extends Component {

    state = {
        clicked: false
    }

    componentDidMount() {

        this.fetchData()
    }

    shouldComponentUpdate(nextProps) {
        
        if(nextProps.match.params.rollno !== this.props.match.params.rollno) 
            this.fetchData(nextProps.match.params.rollno)
            
        if (this.state && this.state.clicked) this.setState({ clicked: false });
        return true
    }

    fetchData = (rollno = this.props.match.params.rollno) => {
        let course = this.props.match.params.course
        let sem = this.props.match.params.sem;
        // debugger
        this.props.get_student(sem, course, rollno)
    }

    submitClicked = () => {
        this.setState({ clicked: true })
    }

    render() {


        let content = <h1>Loading</h1>

        if (this.props.student)
            content = <Profile clicked = {this.state.clicked} submitClicked = {this.submitClicked}/>

        return content;
    }
}

const mapStateToProps = (state) => {
    return {
        student: state.student.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_student: (sem, course, rollno) => dispatch(actions.get_student(sem, course, rollno))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(studentResult));
