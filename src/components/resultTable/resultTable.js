import React from 'react';
import styles from './resultTable.module.css'

let execptions = ['Drug Abuse:Problem Mgt.& Prevention (Qualified)']

const resultTable = props => {
    let color = props.resultState? '#27ae60' : '#e74c3c';
    let allTotal = props.data.reduce((a,c) => {
        let total = getTotal(c);
        if(total === "--") return a+0
        else if(execptions.includes(c.subject)) return a+0
        return a+total 
    },0)
    
    let tableRows = props.data.map(e => {
        let total = getTotal(e);
        let style;
        
        if(total === "--")
            style = {
                textDecoration: "underline",
                textDecorationStyle: "wavy",
                textDecorationColor: "red"
            }
        return (
            <tr>
                <td style = {style}>{e.subject}</td>
                <td>{total}</td>
            </tr>
            
        )
        
    })
    
    return (
        <table className = {styles.table}>
            
                <th>Subject</th>
                <th>Total</th>
            
            
            {tableRows}
            
            <tr style = {{background: color, color: "white"}}>
                <td>TOTAL</td>
                <td>{allTotal}</td>
            </tr>
        </table>
    );
}


function getTotal(e){
    if(e.total) return e.total
    else if(execptions.includes(e.subject)) return e.external + e.internal;
    return '--'
}

export default resultTable;