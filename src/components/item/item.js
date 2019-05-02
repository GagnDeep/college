import React from 'react';
import styles from './item.module.css'

const item = props => {
    return (
       <div className = {styles.mainDiv}>
            <img src = {props.imageSource}/>
            <div id = 'name'>
                {props.name}
            </div>
            <div id = 'mobile'>
                {props.mobile}
            </div>
       </div>
    );
}

export default item;