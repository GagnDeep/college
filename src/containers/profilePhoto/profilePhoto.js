import React from 'react';
import styles from './profilePhoto.module.css';

const profilePhoto = props => {
    return (
        <div 
             style = {{background: `url(${props.image})`,backgroundPosition: '70% 30%',
    'background-size': '110%'}}
             className = {styles.profile}/>
    );
}

export default profilePhoto;