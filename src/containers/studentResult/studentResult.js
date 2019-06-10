import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Profile from './../../containers/profile/profile';
import * as actions from './../../store/actions/index';


const StudentResult = props => {

    const [clicked, setClicked] = useState(false)

    useEffect(fetchData, [props.match.params.rollno]);

    useEffect(shouldChangeClicked, [props.location.pathname, props.match.url])


    function shouldChangeClicked() {
        if (props.match.url === props.location.pathname) setClicked(false)
    }

    function fetchData(rollno = props.match.params.rollno) {
        let course = props.match.params.course
        let sem = props.match.params.sem;
        props.get_student(sem, course, rollno)
    }


    let content = <h1>Loading</h1>

    if (props.student)
        content = <Profile clicked = {clicked} submitClicked = {() => setClicked(true)}/>

    return content;

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentResult));
