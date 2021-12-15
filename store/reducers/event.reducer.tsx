import { SET_EVENT_DESCRIPTION, SET_EVENT_LOCATION, SET_EVENT_DATE, EventActionTypes } from "../types";


interface EventState {
    description: string,
    location: string,
    date: Date,
}

const initialState: EventState = {
    description: "",
    location:"",
    date: new Date(1598051730000),
};

export function eventReducer(state: EventState = initialState, action: EventActionTypes): EventState {
    switch(action.type) {
        case SET_EVENT_DESCRIPTION:{
            return {
                ...state,
                description: action.payload
            }
        }
        case SET_EVENT_LOCATION:{
            return {
                ...state,
                location: action.payload
            }
        }
        case SET_EVENT_DATE:{
            return {
                ...state,
                date:action.payload
            }
        }
        default:
            return state;
    }
}