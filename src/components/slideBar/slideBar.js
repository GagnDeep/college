import React, { useState, useEffect } from 'react';
import styles from './slideBar.module.css';
import data from './../../courses';
import Course from './../course/course';
import posed, {PoseGroup} from 'react-pose';

import Backdrop from './../backdrop/backdrop';

const SlideBarDiv = posed.div({
    enter: {
        x: '0%',
        transition: {
            duration: 200,
            ease: 'easeIn'
        }
    },
    exit: {
        x: '-100%',
        transition: {
            duration: 200,
            ease: 'easeIn'
        }
    }
})

const SlideBar = ({ open, closeHandler }) => {

    const [searchString, setSearchString] = useState("");;
    const [selectedCourse, setSelectedCourse] = useState(null);
    // debugger
    useEffect(() => {
        if (open || selectedCourse) document.querySelector('body').style.overflow = "hidden"
        else document.querySelector('body').style.overflow = "scroll";
        // if(open) animate(open);
    }, [open])
    // if (!open) return null;

    let courseDisplay = null

    courseDisplay = (
        <Backdrop clickHandler = {() => setSelectedCourse(null)} show = {null||selectedCourse} styles = {{zIndex:"15"}}>
            <Course cancelHandler = {() => setSelectedCourse(null)} course = {selectedCourse} show = {null||selectedCourse}/>
        </Backdrop>
    )
    
    const regex = new RegExp(searchString, 'gi')
    const listContent = data
                        .filter(e => searchString !== "" ? (regex.test(e.name)) : e)
                        .map(e => (
                                <div className = {styles.ListItem} 
                                    onClick = {() => 
                                    setSelectedCourse(e)}>{e.name}
                                </div>
                            ))

    return (
        <Backdrop styles = {{top: "40px"}} clickHandler = {closeHandler} show = {open}>
            {courseDisplay}
            <PoseGroup >
                {
                    open && [
                        <SlideBarDiv key = "gagan" className = {styles.Container} onClick = {(e) => e.stopPropagation()}>
                            <input type = "text" placeholder = "Search" onChange = {(e) => setSearchString(e.target.value)}/>
                            <div className = {styles.list}>
                                {listContent}
                            </div>
                        </SlideBarDiv>
                    ]
                }
            </PoseGroup>
        </Backdrop>
    )
}



export default SlideBar;
