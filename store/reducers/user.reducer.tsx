import { SET_USER_INFOS, SET_USER_LOCALIZATION,LOGGED_IN, UserActionTypes, UserInterface, UserLocalization, LOGGED_IN_WITH_GOOGLE, SET_USER_ID, UserMatch, SET_USER_MATCH, UsersMatch, REMOVE_USER_MATCH, RESET_STATE } from "../types/user.types";


interface UserState {
    user: UserInterface
    localization: UserLocalization
    loggedIn: Boolean
    loggedInWithGoogle:Boolean
    user_id: Number
    users: UsersMatch
}

const initialState: UserState = {
    user: {
        google_id:"",
        email: "",
        first_name: "",
        last_name: "",
        picture: "",
        locale: "",
        age: "",
        gender: "",
        city:"",
        longitude:0,
        latitude:0
    },
    user_id:0,
    localization: {
        city: "",
        country: "",
        address: "",
        region: "",
        subRegion: "",
        latitude:0,
        longitude:0

    },
    loggedIn: false,
    loggedInWithGoogle: false,
    users:[]

};

export function userReducer(state: UserState = initialState, action: UserActionTypes): UserState {
    switch (action.type) {
        case SET_USER_INFOS: {
            console.log(action.payload, 'payload user')
            return {
                ...state,
                user: action.payload
            }
        }
        case SET_USER_LOCALIZATION:{
            return {
                ...state,
                localization: action.payload,
            }
        }
        case LOGGED_IN:{
            return {
                ...state,
                loggedIn: action.payload,
            }
        }
        case LOGGED_IN_WITH_GOOGLE:{
            console.log(action.payload, 'payload')
            return {
                ...state,
                loggedInWithGoogle:action.payload
            }
        }
        case SET_USER_ID:{
            return {
                ...state,
                user_id:action.payload
            }
        }
        case SET_USER_MATCH: {
            return {
                ...state,
                users: action.payload
            }
        }
        case REMOVE_USER_MATCH: {

            return {
                ...state,
                users: state.users.filter((user) => user.first_name !== action.payload)
            }
        }
        case RESET_STATE: {
            console.log('reset state')
            return initialState;
        }
        default:
            return state;
    }
}