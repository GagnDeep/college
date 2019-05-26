import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import List from './../../components/resultList/resultList'



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
                this.setState({ resultData: resultArr, sem: sem})
            })
    }
    render() {
            return (
                <List show = {Boolean(this.state)}
                      clickHandler = {this.props.clickHandler}
                      {...this.state}>RESULT LIST</List>
            );
    }
    inputChangedHandler = (e) => {
        this.setState({searchString: e.target.value.toUpperCase()})
    }
}

export default withRouter(resultList);
