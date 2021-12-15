export const SET_USER_INFOS = "SET_USER_INFOS";
export const SET_USER_LOCALIZATION = "SET_USER_LOCALIZATION";
export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_IN_WITH_GOOGLE = "LOGGED_IN_WITH_GOOGLE";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_MATCH = "SET_USER_MATCH";
export const REMOVE_USER_MATCH = "REMOVE_USER_MATCH";
export const RESET_STATE = "RESET_STATE";


export interface UserInterface {
    google_id:string,
    email: string,
    first_name:string,
    last_name:string,
    picture:string,
    locale:string,
    age:string,
    gender:string,
    city:string,
    latitude:number,
    longitude:number

}

export interface UserMatch {
        id:number,
        first_name:string,
        picture:string,
        locale:string,
        age:string,
        gender:string
}

export interface UsersMatch extends Array<UserMatch>{}


export interface UserLocalization {
    city:string,
    country:string,
    address:string,
    region:string,
    subRegion:string,
    latitude:number,
    longitude:number
}
interface SetUserInfos{
    type: typeof SET_USER_INFOS,
    payload: UserInterface,
}
interface SetUserLocalization{
    type: typeof SET_USER_LOCALIZATION,
    payload: UserLocalization,
}

interface LoggedIn{
    type: typeof LOGGED_IN,
    payload: boolean,
}

interface SetUserId{
    type: typeof SET_USER_ID,
    payload: number,
}

interface LoggedInWithGoogle{
    type: typeof LOGGED_IN_WITH_GOOGLE,
    payload: boolean,
}

interface SetUserMatch{
    type: typeof SET_USER_MATCH,
    payload: UserMatch[],
}

interface RemoveUserMatch{
    type: typeof REMOVE_USER_MATCH,
    payload: string,
}

interface ResetState{
    type: typeof RESET_STATE,
}




export type UserActionTypes = SetUserInfos | SetUserLocalization | LoggedIn | LoggedInWithGoogle | SetUserId | SetUserMatch | RemoveUserMatch | ResetState;