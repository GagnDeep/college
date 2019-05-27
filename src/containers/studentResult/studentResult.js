import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router';
import Profile from './../../containers/profile/profile';


class studentResult extends Component {


    componentDidMount() {

        this.fetchData()
    }

    shouldComponentUpdate() {
        if (this.state && this.state.clicked) this.setState({ clicked: false });
        return true
    }

    fetchData = (rollno = this.props.match.params.rollno) => {
        let course = this.props.match.params.course
        let sem = this.props.match.params.sem;
        let url = `https://college-2d3b0.firebaseio.com/${course}/full/${rollno}.json`
        axios.get(url).then(e => {
                // debugger
                let data = e.data;


                data["result"] = data.result[sem]
                data["resultState"] = data.result.resultState ? "PASS" : "FAIL";

                let i = 0;
                data["percent"] = (data.result.resultData.reduce((a, c) => {
                    // c = execptions.indexOf(c.subject) === -1 ? (c.internal ? c.internal : 0) +
                    //     (c.external ? c.external : 0) : 0
                    if(typeof c.total !== "string") i++
                    let total = a + (c.total ? (typeof c.total === "string" ? 0 : c.total) : ((c.internal ? c.internal : 0) + (c.external ? c.external : 0)))
                    // debugger
                    return total
                }, 0) / (i * 100)) * 100;

                data["sem"] = sem;

                data['clicked'] = false

                this.setState(data)

            })
            .catch(err => console.log(err))
    }

    submitClicked = () => {
        this.setState({ clicked: true })
    }

    render() {


        let content = <h1>Loading</h1>

        if (this.state)
            content = <Profile {...this.state} clickHandler = {this.fetchData} submitClicked = {this.submitClicked} course = {this.props.match.params.course}/>

        return content;
    }
}

export default withRouter(studentResult);
