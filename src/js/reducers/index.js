import {TOGGLE_TIME} from '../constants/action-types';

const initialState = {
    time : true
}

const rootReducer = (state = initialState,action) =>{
    switch(action.type){
        case TOGGLE_TIME:
                        return{
                            ...state,
                            time : !state.time
                        }
                        break;
        default : return initialState;                

    }
}
export default rootReducer;