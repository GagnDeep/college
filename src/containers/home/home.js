import React, {useState} from 'react';
import Header from './../../components/headerHome/headerHome';
import Body from '../../components/bodyHome/bodyHome';
import Footer from './../../components/footerHome/footerHome';

const Home = () => {
    return (
        <div>
            <Header/>
            <Body />
            <Footer />
        </div>    
    )
}

export default Home;