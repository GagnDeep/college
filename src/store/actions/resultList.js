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
