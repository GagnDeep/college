import * as actionTypes from './../actionTypes';

const initialState = {
    resultData: [],
    sem: null,
    showList: false,
    failedData: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.SET_RESULTLIST: 
            return {
                ...state,
                resultData: action.resultData,
                sem: action.sem,
                showList: true
            }
            
        case actionTypes.SET_FAILEDLIST:
            return {
                ...state,
                failedData: action.failedData,
                sem: action.sem
            }
        
        default: return state
    }
};

export default reducer
