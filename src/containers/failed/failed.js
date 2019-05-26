import React, { Component } from 'react';
import chart from 'chart.js'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import List from './../../components/resultList/resultList'

let colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]


class Failed extends Component {

    state = {
        show: false,
        selectedSubject: 0
    }

    componentDidMount() {
        let course = this.props.match.params.course
        axios.get(`https://college-2d3b0.firebaseio.com/${course}/full.json`)
            .then(res => {
                let data = res.data,
                    sem = this.props.match.params.sem;
                // debugger
                let resultArr = Object.keys(data).map(e => {
                    return {
                        name: data[e].name,
                        rollno: data[e].rollno,
                        resultState: data[e].result[sem].resultState,
                        total: data[e].result[sem].total,
                        resultData: data[e].result[sem].resultData
                    }
                })

                resultArr.sort((a, b) => b.total - a.total);
                resultArr = resultArr.map((e, i) => {
                    return { ...e }
                })

                let failedObj = this.failedInSelected(resultArr)
                this.setState({ failedData: failedObj, sem: sem})
            });
    }

    failedInSelected(data) {
        let obj = {};
        data.forEach(e => {
            e.resultData.forEach(el => {
                if (!obj[el.subject]) {
                    obj[el.subject] = []
                }
                if (!el.pass) obj[el.subject].push(e)
            })
        })
        return obj;
    }
    
    clickHandler = subject => {
        this.setState({selectedSubject: subject})
    }

    render() {
        let content1 = <h1>Loading</h1>, content2
        
        if(this.state.failedData) content1 = null

        if (this.state.selectedSubject) {
            content2 = <List show = {Boolean(this.state.selectedSubject)}
                      resultData = {this.state.failedData[this.state.selectedSubject]} 
                      sem = {this.props.match.params.sem}/>
        }

        return (
            <div>
                <h3 style = {{textAlign: "center"}}>Subjects With Highest Failure</h3>
                {content1}
                <canvas id="myChart" width="400" height="500" style = {{maxWidth:'500px', maxHeight:'500px', margin: '0 auto'}}></canvas>
                {content2}
            </div>
        );
    }

    componentDidUpdate() {
        if (this.state.failedData && !this.state.selectedSubject) {
            let result = this.state.failedData;
            let subjectNames = Object.keys(result)
            console.log(chart.defaults.pie)
            var ctx = document.getElementById('myChart');
            let ch = new chart(ctx, {
                type: 'bar',

                data: {
                    labels: subjectNames.map(e => e.substr(0, 20)),
                    datasets: [{
                        label: "Failed",
                        data: subjectNames.map(e => result[e].length),
                        backgroundColor: subjectNames.map(e => getRandomColor()),
                        // borderColor: !resultState ? result.map(e => e.pass ? '#27ae60' : '#e74c3c') : 'white',
                        borderWidth: 2
                    }],
                },
                options: {
                    
                    tooltips: {
                        enabled: false
                    },
                    onClick: e => {
                        let element = ch.getElementAtEvent(e);
                        if(element[0]) 
                            this.clickHandler(ch.data.labels[element[0]._index])
                         
                    },

                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'CLICK ON BAR TO VIEW TABLE',
                        position: 'bottom'
                    },
                    animation: {
                        onComplete: (ani) => {
                            // this.animationComplete()
                        }

                    },
                }
            });
        }
        if(this.state.selectedSubject){
            let html = document.querySelector("html")
            html.scrollBy(0,400)
        }
    }

}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

export default withRouter(Failed)
