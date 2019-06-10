import React, { useState, useEffect } from 'react';
import chart from 'chart.js'

let colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]

const Graph = props => {

    const [complete, setComplete] = useState(false)

    useEffect(() => plotGraph(props, setComplete), [])

    return [
        (<canvas id="myChart" width="400" height="400" style = {{maxWidth:'500px', maxHeight:'500px', margin: '0 auto'}}></canvas>),
        complete
    ]

}

function plotGraph(props, setComplete) {
    let result = props.resultData
    let resultState = props.resultState
    console.log(chart.defaults.pie)
    var ctx = document.getElementById('myChart');
    new chart(ctx, {
        type: 'pie',

        data: {
            labels: result.map(e => e.subject),
            datasets: [{
                label: result.map(e => e.subject),
                data: result.map(e => e ? (e.internal + e.external) : 0),
                backgroundColor: result.map(e => e.pass ? (
                    resultState ? getRandomColor() : 'rgba(39, 174, 96, 0.5)') : 'rgba(231, 76, 60, 0.5)'),
                borderColor: !resultState ? result.map(e => e.pass ? '#27ae60' : '#e74c3c') : 'white',
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
                    props.completeHandler(true)
                }

            },
        }
    });
}


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

export default Graph;
