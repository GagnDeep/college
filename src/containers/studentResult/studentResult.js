import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router';
import Profile from './../../containers/profile/profile';


class studentResult extends Component {


    componentDidMount() {
        this.fetchData()
    }

    fetchData = (rollno = this.props.match.params.rollno) => {
        let sem = this.props.match.params.sem;
        let url = `https://college-2d3b0.firebaseio.com/full/${rollno}.json`
        axios.get(url).then(e => {
                // debugger
                let data = e.data;


                data["result"] = data.result[sem]
                data["resultState"] = data.result.resultState ? "PASS" : "FAIL";

                let i = 1;
                data["percent"] = (data.result.resultData.reduce((a, b) => {
                    if (b.total) i++;
                    return a + (b.total ? b.total : 0);
                }, 0) / (i * 100)) * 100;

                data["sem"] = sem;

                this.setState(data)

            })
            .catch(err => console.log(err))
    }

    render() {


        let content = <h1>Loading</h1>

        if (this.state)
            content = <Profile {...this.state} clickHandler = {this.fetchData}/>

        return content;
    }
}

export default withRouter(studentResult);
