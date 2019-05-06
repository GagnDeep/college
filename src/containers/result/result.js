import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import ResultList from './../resultList/resultList'
import StudentResult from './../studentResult/studentResult';
import ExamForm from './../exam-form/exam-form'


class result extends Component{
    render(){
        return (<Switch>
            <Route path = '/exam-form/:course' component = {ExamForm} />
            <Route path = '/results/:sem/:rollno/:course' component = {StudentResult} />
            <Route path = '/results/:sem/:course' component = {ResultList}/>
        </Switch>)
    }
}

export default result
