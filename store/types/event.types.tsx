export const SET_EVENT_DESCRIPTION = "SET_EVENT_DESCRIPTION";
export const SET_EVENT_LOCATION = "SET_EVENT_LOCATION";
export const SET_EVENT_DATE = "SET_EVENT_DATE";

interface SetEventDescriptionAction {
    type: typeof SET_EVENT_DESCRIPTION,
    payload: string
}

interface SetEventLocationAction {
    type: typeof SET_EVENT_LOCATION,
    payload: string
}

interface SetEventDateAction {
    type: typeof SET_EVENT_DATE,
    payload: Date
}



export type EventActionTypes = SetEventDescriptionAction | SetEventLocationAction | SetEventDateAction