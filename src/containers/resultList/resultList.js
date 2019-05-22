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

                resultArr.sort((a, b) => b.total - a.total);
                resultArr = resultArr.map((e,i) => {
                    return {...e, rank: i}
                })
                this.setState({ data: resultArr, sem: sem, searchString: ""})
            })
    }
    render() {
            let content = <h1>Loading</h1>
            let data = []
            if (this.state) {
                data = this.state.data
                
                if(this.state.searchString !== ""){
                    data = data.filter(e =>e.rollno.includes(this.state.searchString)||e.name.includes(this.state.searchString) )
                    
                }
                if(data.length)
                content = data.map((e,i) => {
                    return <Item {...e} index = {e.rank} sem = {this.state.sem} clickHandler = {this.props.clickHandler} course = {this.props.match.params.course}/>
                })
                else
                content = <p>Result Not Found</p>


            }

            // if (this.state)
            // content = <Profile {...this.state}/>

            return (
                <div style = {{marginBottom: "200px"}}>
                    <h1 style = {{textAlign:'center'}}>RESULT LIST</h1>
                    <input type="text" placeholder = "Search by name or roll no" onChange = {this.inputChangedHandler}/>
                    <table style={{margin:'0 auto', borderCollapse: 'collapse'}}>
                        {this.state&&data.length?<th>RANK</th>:null}
                        {this.state&&data.length?<th>NAME</th>:null}
                        {this.state&&data.length?<th>Total</th>:null}
                        {this.state&&data.length?<th>RollNo.</th>:null}
                        
                        {content}
                    </table>
                </div>
            );
    }
    inputChangedHandler = (e) => {
        this.setState({searchString: e.target.value.toUpperCase()})
    }
}

export default withRouter(resultList);
