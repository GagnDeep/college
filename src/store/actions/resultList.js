import * as actionTypes from './../actionTypes';
import axios from 'axios';

export const set_resultList = (payload) => {
    return {
        type: actionTypes.SET_RESULTLIST,
        ...payload
    }
}

export const get_resultList = (sem, course) => {
    return async dispatch => {
        const res = await axios.get(`https://college-2d3b0.firebaseio.com/${course}/partial.json`)

        let data = res.data;

        let resultArr = Object.keys(data).map(e => {
            return new student(data, e, sem)
        })

        resultArr = getRanks(resultArr)
        dispatch(set_resultList({ resultData: resultArr, sem: sem }))
    }
}

export const get_failedList = (sem, course) => {
    return async dispatch => {
        let res = await axios.get(`https://college-2d3b0.firebaseio.com/${course}/full.json`)

        let data = res.data;
        // debugger
        let resultArr = Object.keys(data).map(e => {
            let obj = new student(data, e, sem)
            return {
                ...obj,
                resultData: data[e].result[sem].resultData
            }
        })

        resultArr.sort((a, b) => b.total - a.total);
        resultArr = resultArr.map((e, i) => {
            return { ...e }
        })

        let failedObj = failedInSelected(resultArr)
        dispatch(set_failedList({ failedData: failedObj, sem: sem }))
    }

}

function failedInSelected(data) {
    let obj = {};
    data.forEach(e => {
        e.resultData.forEach(el => {
            if (!obj[el.subject]) {
                obj[el.subject] = []
            }
            if (!el.pass) obj[el.subject].push(e)
        })
    })
    return obj;
}
export const set_failedList = payload => {
    return {
        type: actionTypes.SET_FAILEDLIST,
        ...payload
    }
}

function getRanks(arr) {
    arr.sort((a, b) => b.total - a.total);
    return arr.map((e, i) => {
        return { ...e, rank: i }
    })
}

class student {
    constructor(data, e, sem) {
        this.name = data[e].name;
        this.rollno = data[e].rollno;
        this.resultState = data[e].result[sem].resultState;
        this.total = data[e].result[sem].total;
    }
}
