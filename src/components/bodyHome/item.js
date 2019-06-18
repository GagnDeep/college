import React from 'react';
import styles from './item.module.css';

const Item = props => {
    return (
        <div className = {styles.Container}>
            <div style = {{background: `url(${props.image})`}} className = {styles.Image}/>
            <div className = {styles.Heading}>{props.title}</div>
            <div className = {styles.Text}>{props.description}</div>
        </div>
    )
}

export default Item;