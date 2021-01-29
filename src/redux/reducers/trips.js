import { SIGN_OUT, TRIPS_UPDATED } from "../actionTypes";

const defaultState = {
    list: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case TRIPS_UPDATED:
            return {
                ...state,
                list: action.trips
            };
        case SIGN_OUT:
            return defaultState;
        default:
            return state;
    }
}