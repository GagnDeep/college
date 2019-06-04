import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Item from './../item/item'

class List extends Component {

    state = {
        searchString: ""
    }

    render() {
        const { resultData, showList } = this.props;
        const course = this.props.match.params.course;
        const sem = this.props.match.params.sem;

        let content = <h1>Loading</h1>
        let data = []
        if (showList) {

            let searchString = this.state.searchString
            data = resultData

            if (this.state.searchString !== "") {
                data = data.filter(e => e.rollno.includes(searchString) || e.name.includes(searchString))
            }

            if (data.length)
                content = data.map((e, i) => {
                    return <Item {...e} index = {e.rank?e.rank:i} sem = {sem} course = {course}/>
                })

            else
                content = <p>Result Not Found</p>
        }
            // debugger;

        return (
            <div style = {{marginBottom: "200px"}}>
                    <h1 style = {{textAlign:'center'}}>{this.props.children}</h1>
                    <input type="text" placeholder = "Search by name or roll no" onChange = {this.inputChangedHandler}/>
                    <table style={{margin:'0 auto', borderCollapse: 'collapse'}}>
                        {showList&&data.length?<th>RANK</th>:null}
                        {showList&&data.length?<th>NAME</th>:null}
                        {showList&&data.length?<th>Total</th>:null}
                        {showList&&data.length?<th>RollNo.</th>:null}
                        
                        {content}
                    </table>
                    <p>This website is a test version. If there is any confusion in displayed result, trust the result on punjabi universty website</p>
                </div>
        );
    }

    inputChangedHandler = (e) => {
        this.setState({ searchString: e.target.value.toUpperCase() })
    }
}

// const mapStateToProps = state => {
//     return {
//         resultData: state.list.resultData,
//         sem: state.list.sem,
//         showList: state.list.showList
//     }
// }

export default withRouter(List)
