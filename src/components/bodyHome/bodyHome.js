import React from 'react';
import styles from './bodyHome.module.css';
import data from './data';
import Item from './item'


const Body = props => {
    
    const items = Object.keys(data).map(e => (<Item {...data[e]} title = {e} />))
    
    return (
        <div className = {styles.Container}>
            <div className = {styles.Heading}>Our Departments</div>
            <div className = {styles.Departments}>
                {items}
            </div>
        </div>
    )
}

export default Body;