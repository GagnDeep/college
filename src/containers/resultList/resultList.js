import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Item from './../../components/item/item'


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

                resultArr.sort((a, b) => b.total - a.total)
                this.setState({ data: resultArr, sem: sem })
            })
    }
    render() {
            let content = <h1>Loading</h1>
            if (this.state) {

                content = this.state.data.map((e,i) => {
                    return <Item {...e} index = {i} sem = {this.state.sem} clickHandler = {this.props.clickHandler} course = {this.props.match.params.course}/>
                })


            }

            // if (this.state)
            // content = <Profile {...this.state}/>

            return (
                <div>
                    <h1 style = {{textAlign:'center'}}>RESULT LIST</h1>
                    <table style={{margin:'0 auto', borderCollapse: 'collapse'}}>
                        {this.state?<th>RANK</th>:null}
                        {this.state?<th>NAME</th>:null}
                        {this.state?<th>Total</th>:null}
                        {this.state?<th>RollNo.</th>:null}
                        
                        {content}
                    </table>
                </div>
            );
    }
}

export default withRouter(resultList);
