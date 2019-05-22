import React from 'react';
import styles from './item.module.css';
import {Link} from 'react-router-dom'

const item = props => {
    let color = props.resultState?'white' : 'rgba(231, 76, 60, 0.3)',
    color2 = props.resultState?'#27ae60':'red',
    color3 = props.resultState?'black':'red';
    const {rollno} = props;
    return (
        <tr className = {styles.mainDiv} style = {{background: color}}>
            <td className = {styles.rank}>
                {props.index+1}
            </td>
            <td className = {styles.name}>
                <Link to = {`/${props.course}/results/${props.sem}/${rollno}/`} style = {{color: color2}} 
                      onClick = {()=>props.clickHandler?props.clickHandler(rollno):null}>
                        {props.name}
                </Link>
                
            </td>
            <td className = {styles.total} style = {{color: color3}}>
                {props.total}
            </td>
            <td className = {styles.rollno}>
                {props.rollno}
            </td>
       </tr>
    );
}

export default item;
