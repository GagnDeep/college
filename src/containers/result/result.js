import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import ResultList from './../resultList/resultList'
import StudentResult from './../studentResult/studentResult';
import ExamForm from './../exam-form/exam-form';
import Failed from './../failed/failed';


class result extends Component{
    render(){
        return (<Switch>
            <Route path = '/:course/exam-form/' component = {ExamForm} />
            <Route path = '/:course/failed/:sem/' component = {Failed} />
            <Route path = '/:course/results/:sem/:rollno/' component = {StudentResult} />
            <Route path = '/:course/results/:sem/' component = {ResultList}/>
            <Route render = {() => {
                return (
                    <h1>404! NOT FOUND</h1>
                )
            }}/>
        </Switch>)
    }
}

export default result
