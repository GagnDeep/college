import {useState, useEffect} from 'react';

export const useGetIndex = (size, interval = 3000) => {
    
    const [imageIndex, setImageIndex] = useState(0);
    
    useEffect(() => {
        getIndex(imageIndex, setImageIndex, size, interval)
    }, [imageIndex, size])
    
    return imageIndex
}

function getIndex(index, setIndex, size, interval){
    setTimeout(() => {
        const i = (index+1)%size;
        setIndex(i)
    }, interval)
}