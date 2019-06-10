import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetData = (url) => {

    const [data, setData] = useState({});
    const [err, setErr] = useState('');

    useEffect(() => {
        getData(url, setData, setErr);
    }, [url])
    
    return [data, err]
}

async function getData(url, setData, setError) {
    try {
        const res = await axios.get(url);
        setData(res.data)
    }
    catch (err) {
        setError(err)
    }
}

export function formatData(data, sem) {
    let arr =  Object.keys(data).map(e => {
        return {
            name: data[e].name,
            rollno: data[e].rollno,
            resultState: data[e].result[sem].resultState,
            total: data[e].result[sem].total
        }
    })
    
    arr.sort((a, b) => b.total - a.total);
    
    return arr.map((e, i) => {
        return { ...e, rank: i }
    })
}
