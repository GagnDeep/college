import React, {useState} from 'react';

import HamBurger from './../hamBurger/hamBurger'
import styles from './navBarHome.module.css';
import SlideBar from './../slideBar/slideBar';

const NavBar = props => {
    
    const [open, setOpen] = useState(false)
    
    return (
        <div className = {styles.Container}>
        
            <HamBurger open = {open} clickHandler = {() => setOpen(!open)}/>
            
            <div className = {styles.InnerText}>
                {props.children}
            </div>
            <SlideBar open = {open} closeHandler = {() => setOpen(!open)}/>
            
        </div>
    )
}

export default NavBar