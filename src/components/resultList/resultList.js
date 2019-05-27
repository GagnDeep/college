import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Item from './../item/item'

class List extends Component{
    
    state = {
        searchString: ""
    }
    
    render(){
        const {resultData, sem, clickHandler, show} = this.props
        
        let content = <h1>Loading</h1>
            let data = []
            if (show) {
                
                let searchString = this.state.searchString
                data = resultData
                
                if(this.state.searchString !== ""){
                    data = data.filter(e =>e.rollno.includes(searchString)||e.name.includes(searchString) )
                }
                
                if(data.length)
                    content = data.map((e,i) => {
                        return <Item {...e} index = {e.rank?e.rank:i} sem = {sem} clickHandler = {clickHandler} course = {this.props.match.params.course}/>
                    })
                    
                else
                    content = <p>Result Not Found</p>
            }
        
        return (
            <div style = {{marginBottom: "200px"}}>
                    <h1 style = {{textAlign:'center'}}>{this.props.children}</h1>
                    <input type="text" placeholder = "Search by name or roll no" onChange = {this.inputChangedHandler}/>
                    <table style={{margin:'0 auto', borderCollapse: 'collapse'}}>
                        {show&&data.length?<th>RANK</th>:null}
                        {show&&data.length?<th>NAME</th>:null}
                        {show&&data.length?<th>Total</th>:null}
                        {show&&data.length?<th>RollNo.</th>:null}
                        
                        {content}
                    </table>
                    <p>This website is a test version. If there is any confusion in displayed result, trust the result on punjabi universty website</p>
                </div>
        );
    }
    
    inputChangedHandler = (e) => {
        this.setState({searchString: e.target.value.toUpperCase()})
    }
}

export default withRouter(List)
