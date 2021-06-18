// tüm statelerin toplandığı yer

import { combineReducers } from "redux";
import jobAdvertisementReducer from "./reducers/jobAdvertisementReducer";

const rootReducer = combineReducers({
    jobAdvertisement: jobAdvertisementReducer
})

export default rootReducer;