import * as actionTypes from './../actionTypes';


const initialState = {
    student: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        
        case actionTypes.SET_STUDENT:
            return {
                ...initialState,
                profile: action.profile
            }
        
        default: return state;
    }
}

export default reducer