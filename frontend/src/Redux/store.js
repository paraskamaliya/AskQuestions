import { combineReducers, legacy_createStore } from "redux";
import { AuthReducer } from "./AuthReducer/reducer";
const rootReducer = combineReducers({ AuthReducer })
export const store = legacy_createStore(rootReducer);