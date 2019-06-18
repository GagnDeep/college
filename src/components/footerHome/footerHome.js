import React, {useEffect, useState} from 'react';
import styles from './footerHome.module.css';

import Course from './../course/course';

import Backdrop from './../backdrop/backdrop';

let data = require('./../../courses')


const Footer = props => {
    
    const [selectedCourse, setSelectedCourse] = useState(null);
    let dialogBox = null;
    // debugger
    useEffect(() => {
        if (selectedCourse) document.querySelector('body').style.overflow = "hidden"
        else document.querySelector('body').style.overflow = "scroll"
    }, [selectedCourse])


    if (selectedCourse) dialogBox = (
        <Backdrop clickHandler = {() => setSelectedCourse(null)}>
            <Course cancelHandler = {() => setSelectedCourse(null)} course = {selectedCourse}/>
        </Backdrop>
    )
    
    const content = data.map(e => {
        return (
            <div className = {styles.Item} onClick = {() => setSelectedCourse(e)}>{e.name}</div>    
        )
    })
    
    return (
        <div className = {styles.Container}>
            {content} 
            {dialogBox}
        </div>
    )
}

export default Footer;
