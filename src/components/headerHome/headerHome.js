import React from 'react';
import styles from './headerHome.module.css';
import NavBar from './../navBarHome/navBarHome';
import IntroGallery from './../introGalleryHome/introGalleryHome';

const Home = props => {
    return (
        <div className = {styles.HeaderContainer}>
            <NavBar>Mohindra College</NavBar>
            <IntroGallery />
            <div className = {styles.MoreIntroContainer}>
                <div className = {styles.MoreIntroText}>
                    "One of the Finest and Oldest institution of Punjab"
                </div>
            </div>
        </div>    
    )
}


export default Home;