import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import List from './../../components/resultList/resultList';
import * as actionTypes from './../../store/actionTypes'



class resultList extends Component {

    componentDidMount() {
        let course = this.props.match.params.course
        axios.get(`https://college-2d3b0.firebaseio.com/${course}/partial.json`)
            .then(res => {
                let data = res.data, sem = this.props.match.params.sem;

                let resultArr = Object.keys(data).map(e => {
                    return {
                        name: data[e].name,
                        rollno: data[e].rollno,
                        resultState: data[e].result[sem].resultState,
                        total: data[e].result[sem].total
                    }
                })

                resultArr.sort((a, b) => b.total - a.total);
                resultArr = resultArr.map((e,i) => {
                    return {...e, rank: i}
                })
                this.props.setResultList({ resultData: resultArr, sem: sem})
            })
    }
    render() {
            return (
                <List show = {Boolean(this.props.showList)}
                      clickHandler = {this.props.clickHandler}
                      {...this.props}>RESULT LIST<p style = {{fontSize:"14px"}}>Click on Name to view profile</p></List>
            );
    }
    inputChangedHandler = (e) => {
        this.setState({searchString: e.target.value.toUpperCase()})
    }
}

const mapStateToProps = (state) => {
    return {
        resultData: state.resultData,
        sem: state.sem,
        showList: state.showList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setResultList: (payload) => dispatch({type: actionTypes.SET_RESULTLIST, ...payload})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(resultList));
