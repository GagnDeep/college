import chart from 'chart.js'
import React, { Component } from 'react';
import ResultList from './../../containers/resultList/resultList';
import {Link, withRouter}  from 'react-router-dom';
import {connect} from 'react-redux';

import ResultTable from './../../components/resultTable/resultTable';

let colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]

class charts extends Component {
    
    state = {
        showResultList: false
    }
    render() {
        return (
            <div style ={{textAlign:'center'}}>
                <canvas id="myChart" width="400" height="400" style = {{maxWidth:'500px', maxHeight:'500px', margin: '0 auto'}}></canvas>
                
                <ResultTable data = {this.props.resultData} resultState = {this.props.resultState} total = {this.props.total}/>
                <h4 style = {{background:'rgb(211, 84, 0)', color: 'white', padding: '15px 0'}}>More data about failed students <Link to={`/${this.props.match.params.course}/failed/${this.props.match.params.sem}`} style = {{color:'#f1c40f'}}>Click Here</Link></h4>
                <h4 style = {{background:'rgba(44, 62, 80, 0.9)', color: 'white', padding: '15px 0'}}>To get a copy of your answer sheets <Link to={`/${this.props.match.params.course}/exam-form/`} style = {{color:'#f1c40f'}}>Click Here</Link></h4>
                <br/>
                {this.state.showResultList?<ResultList />:null}
            </div>
        )
    }
    
    animationComplete = () => {
        this.setState({showResultList:true})
    }
    componentDidMount() {
        let result = this.props.resultData;
        let resultState = this.props.resultState;
        console.log(chart.defaults.pie)
        var ctx = document.getElementById('myChart');
        new chart(ctx, {
            type: 'pie',

            data: {
                labels: result.map(e => e.subject),
                datasets: [{
                    label: result.map(e => e.subject),
                    data: result.map(e => e ? (e.internal + e.external) : 0),
                    backgroundColor: result.map(e =>e.pass?(
                            resultState?getRandomColor():'rgba(39, 174, 96, 0.5)') : 'rgba(231, 76, 60, 0.5)'),
                    borderColor: !resultState?result.map(e =>e.pass? '#27ae60' : '#e74c3c'):'white',
                    borderWidth: 2
                }],
            },
            options: {
                title: {
                    display: true,
                    text: 'CLICK PIE TO KNOW SUBJECT',
                    position: 'bottom'
                },
                animation: {
                    onComplete: (ani) => {
                        this.animationComplete()
                    }
                    
                },
            }
        });

    }
}

function getRandomColor() {
    return colors[Math.floor(Math.random()*colors.length)]
}

const mapStateToProps = state => {
    return {
        resultData: state.student.profile.result.resultData,
        resultState: state.student.profile.result.resultState
    }
}

export default withRouter(connect(mapStateToProps)(charts));
