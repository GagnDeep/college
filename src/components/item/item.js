import React from 'react';
import styles from './item.module.css';
import {Link} from 'react-router-dom'

const item = props => {
    let color = props.resultState?'white' : 'rgba(231, 76, 60, 0.3)';
    const {rollno} = props;
    return (
        <tr className = {styles.mainDiv} style = {{background: color}}>
            <td>
                <Link to = {`/results/${props.sem}/${rollno}`}>
                    <div className = {styles.image} style = {{background: `url(${props.image})`, backgroundSize: 'cover',
            backgroundPosition: '90% 10%',}}/>
                </Link>
            </td>
            <td className = {styles.rollno}>
                {props.rollno}
            </td>
            <td className = {styles.name}>
                <Link to = {`/results/${props.sem}/${rollno}`}>
                        {props.name}
                </Link>
                
            </td>
            <td className = {styles.total}>
                Total: {props.total}
            </td>
       </tr>
    );
}

export default item;
