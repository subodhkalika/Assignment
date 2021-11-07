import { ActionTypes } from './constants';

const defaultState = {
    jobs: []
};

export default function leadPageReducer(state = defaultState, action) {
    switch(action.type) {
        case ActionTypes.SET_JOBS:
            return { 
                ...state,
                jobs: action.payload 
            };
        default:
            return state;
    }
}
