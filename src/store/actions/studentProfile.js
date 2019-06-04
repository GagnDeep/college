import * as actionTypes from './../actionTypes';
import axios from 'axios';

export const set_student = payload => {
    return {
        type: actionTypes.SET_STUDENT,
        ...payload
    }
}

export const get_student = (sem, course, rollno) => {
    return async dispatch => {

        let url = `https://college-2d3b0.firebaseio.com/${course}/full/${rollno}.json`
        try {
            let res = await axios.get(url)
            // debugger
            let data = res.data;


            data["result"] = data.result[sem]
            data["resultState"] = data.result.resultState ? "PASS" : "FAIL";

            let i = 0;
            data["percent"] = (data.result.resultData.reduce((a, c) => {
                // c = execptions.indexOf(c.subject) === -1 ? (c.internal ? c.internal : 0) +
                //     (c.external ? c.external : 0) : 0
                if (typeof c.total !== "string") i++
                    let total = a + (c.total ? (typeof c.total === "string" ? 0 : c.total) : ((c.internal ? c.internal : 0) + (c.external ? c.external : 0)))
                // debugger
                return total
            }, 0) / (i * 100)) * 100;

            data["sem"] = sem;
            data["course"] = course;
            dispatch(set_student({profile: data}))
        }
        
        catch (err) {
            console.log(err)
        }

    }
}
