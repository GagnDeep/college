import React from 'react';
import styles from './profilePhoto.module.css';

const profilePhoto = props => {
    return (
        <div 
             style = {{background: `url(${props.image})`}}
             className = {styles.profile}/>
    );
}

export default profilePhoto;