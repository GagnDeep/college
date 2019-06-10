import chart from 'chart.js'
import React, { useState } from 'react';
import ResultList from './../../containers/resultList/resultList';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Graph from './../../components/graph/graph'

import ResultTable from './../../components/resultTable/resultTable';


const Charts = (props) => {
    const [showList, setShowList] = useState(false);
    return (
        <div style ={{textAlign:'center'}}>
                <Graph completeHandler = {setShowList} resultData = {props.resultData} resultState = {props.resultState}/>
                <ResultTable data = {props.resultData} resultState = {props.resultState} total = {props.total}/>
                <h4 style = {{background:'rgb(211, 84, 0)', color: 'white', padding: '15px 0'}}>More data about failed students <Link to={`/${props.match.params.course}/failed/${props.match.params.sem}`} style = {{color:'#f1c40f'}}>Click Here</Link></h4>
                <h4 style = {{background:'rgba(44, 62, 80, 0.9)', color: 'white', padding: '15px 0'}}>To get a copy of your answer sheets <Link to={`/${props.match.params.course}/exam-form/`} style = {{color:'#f1c40f'}}>Click Here</Link></h4>
                <br/>
                {showList?<ResultList />:null}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        resultData: state.student.profile.result.resultData,
        resultState: state.student.profile.result.resultState
    }
}

export default withRouter(connect(mapStateToProps)(Charts));