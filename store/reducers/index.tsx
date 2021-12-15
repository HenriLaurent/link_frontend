import { combineReducers } from "redux";
import { eventReducer } from "./event.reducer";
import { userReducer } from "./user.reducer";


export const rootReducer = combineReducers({
    event: eventReducer,
    user: userReducer
});


export type RootState = ReturnType<typeof rootReducer>;