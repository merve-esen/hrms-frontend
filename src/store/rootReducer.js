// tüm statelerin toplandığı yer

import { combineReducers } from "redux";
import employerReducer from "./reducers/employerReducer";
import jobAdvertisementReducer from "./reducers/jobAdvertisementReducer";

const rootReducer = combineReducers({
    jobAdvertisement: jobAdvertisementReducer,
    employer: employerReducer
})

export default rootReducer;