import chart from 'chart.js'
import React, { Component } from 'react';
import ResultList from './../../containers/resultList/resultList'

let colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]

class charts extends Component {
    render() {
        return (
            <div style ={{textAlign:'center'}}>
                <canvas id="myChart" width="400" height="400" style = {{maxWidth:'500px', maxHeight:'500px', margin: '0 auto'}}></canvas>
                <h5>Click on PIE to know subject</h5>
                <h5>Also Click on subject names</h5>
                <br/>
                <ResultList/>
            </div>
        )
    }
    componentDidMount() {
        let result = this.props.result.resultData;
        let resultState = this.props.result.resultState;
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
                    text: 'SUBJECT WISE PERCENT CONTRIBUTION',
                    position: 'bottom'
                }
            }
        });

    }
}

function getRandomColor() {
    return colors[Math.floor(Math.random()*colors.length)]
}


export default charts;
