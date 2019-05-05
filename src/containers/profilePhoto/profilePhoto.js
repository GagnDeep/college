import React from 'react';
import styles from './profilePhoto.module.css';

const profilePhoto = props => {
    return (
        <div 
             style = {{background: `url(${props.image})`, height: (props.height-5)+"vh",width: (props.height-5)+"vh"}}
             className = {styles.profile}/>
    );
}

export default profilePhoto;