import { createStore, combineReducers } from "redux";
import leadPageReducer from "./containers/Leads/reducers";

const reducers = combineReducers({ leadPageReducer });

export default createStore(reducers);