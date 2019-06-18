import React from 'react';
import styles from './hamBurger.module.css';

const HamBurger = props => {
    let content = 'HH';
    
    if(props.open) content = 'XX'
    
    return (
        <div className = {styles.HamBurger} onClick = {props.clickHandler}>
            {content}
        </div>
    )
}

export default HamBurger;
