import { SET_EVENT_DESCRIPTION, SET_EVENT_DATE, SET_EVENT_LOCATION, EventActionTypes } from "../types";
import { ActionCreator } from "redux";

export const setEventDescription: ActionCreator<EventActionTypes> = (value: string) => {
    return {type: SET_EVENT_DESCRIPTION, payload: value};
}

export const setEventLocation: ActionCreator<EventActionTypes> = (value: string) => {
    return {type: SET_EVENT_LOCATION, payload: value};
}

export const setEventDate: ActionCreator<EventActionTypes> = (value: Date) => {
    return {type: SET_EVENT_DATE, payload: value};
}