import React from 'react';
import styles from './introGalleryHome.module.css';
import {useGetIndex} from './getImages'

const images = [
    "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/06/11/Pictures/_b9c37a94-6d30-11e8-9a75-8898ac94ce9e.jpg",
    "https://static.careers360.mobi/media/presets/720X480/colleges/social-media/media-gallery/8686/2018/8/7/Government-Mohindra-College-Patiala-c1.jpg",
    "https://patialacity.files.wordpress.com/2010/08/2683321684_c4d69b3dd41.jpg"
]

const backgroundImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mohindra_College.jpg/350px-Mohindra_College.jpg";

const Gallery = props => {

    const index = useGetIndex(images.length, 3000)

    const backgroundImageStyle = {
        background: `url(${backgroundImage})`
    }

    const innerImageStyle = {
        background: `url(${images[index]})`
    }

    return (
        <div className = {styles.Container}>
            <div style = {backgroundImageStyle} className = {styles.BackgroundImage}>
                <div style = {innerImageStyle} className = {styles.InnerImage}/>
            </div>
        </div>
    );
}

export default Gallery
