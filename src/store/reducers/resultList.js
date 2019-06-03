import * as actionTypes from './../actionTypes';

const initialState = {
    resultData: [],
    sem: null,
    showList: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.SET_RESULTLIST: 
            return {
                ...initialState,
                resultData: action.resultData,
                sem: action.sem,
                showList: true
            }
        
        default: return state
    }
};

export default reducer
