import { LOGGED_IN, LOGGED_IN_WITH_GOOGLE,SET_USER_MATCH, SET_USER_ID, SET_USER_INFOS, SET_USER_LOCALIZATION, UserActionTypes, REMOVE_USER_MATCH, RESET_STATE } from "../types/user.types";
import { UserInterface, UserLocalization, UserMatch } from "../types/user.types";
import { ActionCreator } from "redux";


export const setUserInfos: ActionCreator<UserActionTypes> = (user: UserInterface) => {
    return {type: SET_USER_INFOS, payload: user}
}

export const setUserLocalization: ActionCreator<UserActionTypes> = (localization: UserLocalization) => {
    return {type:SET_USER_LOCALIZATION, payload: localization}
}

export const loggedIn: ActionCreator<UserActionTypes> = (bool: boolean) => {
    return {type: LOGGED_IN, payload: bool}
}

export const loggedInWithGoogle: ActionCreator<UserActionTypes> = (bool: boolean) => {
    return {type: LOGGED_IN_WITH_GOOGLE, payload: bool}
}

export const setUserId: ActionCreator<UserActionTypes> = (id:number) => {
    return {type: SET_USER_ID, payload:id}
}

export const setUserMatch: ActionCreator<UserActionTypes> = (users: UserMatch[]) => {
    return {type: SET_USER_MATCH, payload: users}
}

export const removeUserMatch: ActionCreator<UserActionTypes>  = (name: string) => {
    return {type: REMOVE_USER_MATCH, payload: name}
}

export const resetState:any = () => {
    return {type: RESET_STATE}
}
