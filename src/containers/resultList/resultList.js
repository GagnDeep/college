import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import List from './../../components/resultList/resultList';
import * as actions from './../../store/actions/index'



class resultList extends Component {
    
    componentDidMount() {
        let course = this.props.match.params.course
        let sem = this.props.match.params.sem;
        
        this.props.get_resultList(sem, course)
    }
    
    render() {
        return (
            <List >
                    RESULT LIST<p style = {{fontSize:"14px"}}>Click on Name to view profile</p>
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        resultData: state.list.resultData,
        sem: state.list.sem,
        showList: state.list.showList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_resultList: (sem, course) => dispatch(actions.get_resultList(sem, course))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(resultList));
