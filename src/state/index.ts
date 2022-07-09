import { combineReducers } from "redux";
import { cardReducer } from './card';

// i separate different reducers as a rule of thumb in all projects, for better organization.
// even though we only have one reducer in this demo, I wanted to keep things organized.
export type GlobalState = {[P in keyof typeof reducerMap]: ReturnType<(typeof reducerMap)[P]>}

const reducerMap = {
    card: cardReducer,
}

 export const rootReducer = combineReducers(reducerMap);