import React from 'react';
import styles from './backdrop.module.css';
import Aux from './../../hoc/aux/aux'

const Backdrop = props => {
    // if(props.open === false) return null
    // document.querySelector('body').style.overflow = "hidden";
    // debugger
    return (
        <Aux>
        <div className = {styles.Backdrop} 
                style = {{...props.styles, display: props.show?'block':'none'}} 
                onClick = {props.clickHandler}/>
         
            {props.children}
        </Aux>
    );
}

export default Backdrop