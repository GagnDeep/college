import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Item from './../../components/item/item'


class resultList extends Component {

    componentDidMount() {
        axios.get('https://college-2d3b0.firebaseio.com/.json')
            .then(res => {
                let data = res.data, sem = this.props.match.params.sem;

                let resultArr = Object.keys(data).map(e => {
                    return {
                        name: data[e].name,
                        result: data[e].result[sem],
                        rollno: data[e].rollno,
                        image: data[e].image,
                        resultState: data[e].result[sem].resultState,
                        total: data[e].result[sem].resultData.reduce((a, b) => a + ((b.internal ? b.internal : 0) + (b.external ? b.external : 0)), 0)
                    }
                })

                resultArr.sort((a, b) => b.total - a.total)
                this.setState({ data: resultArr, sem: sem })
            })
    }
    render() {
            let content = <h1>Loading</h1>
            if (this.state) {

                content = this.state.data.map(e => {
                    return <Item {...e} sem = {this.state.sem}/>
                })


            }

            // if (this.state)
            // content = <Profile {...this.state}/>

            return (
                <div>
                    <h1 style = {{textAlign:'center'}}>RESULT LIST</h1>
                    <table style={{margin:'0 auto', borderCollapse: 'collapse'}}>
                        {content}
                    </table>
                </div>
            );
    }
}

export default withRouter(resultList);
