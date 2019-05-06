import React from 'react';
import styles from './submitted.module.css'

const submitted = props => {
    
    return (
        <div className = {styles.container}>
            <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none"/>
                <path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <h2>Done!</h2>
            
            <h4>SEND THIS VERIFICATION CODE THROUGH WHATSAPP TO <span className = {styles.mobile}>+914045969113</span></h4>
            <div className = {styles.verificationCode}>
                {props.id}
            </div>
            <h5>You will receive your exam sheets as a PDF within 5-7 working days through whatsapp</h5>
        </div>
    );
}

export default submitted;