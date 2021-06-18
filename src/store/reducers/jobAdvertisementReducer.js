import { ADD_JOB_ADVERTISEMENT, REMOVE_JOB_ADVERTISEMENT } from "../actions/jobAdvertisementActions";
import { jobAdvertisementItems } from "../initialValues/jobAdvertisementItems";

const initialState = {
    jobAdvertisementItems: jobAdvertisementItems
}

export default function jobAdvertisementReducer(state=initialState, {type, payload}) {
    switch (type) {
        case ADD_JOB_ADVERTISEMENT:
            return {
                ...state,
                jobAdvertisementItems: [...state.jobAdvertisementItems, payload],
              };
    case  REMOVE_JOB_ADVERTISEMENT:
        return {
            ...state,
            jobAdvertisementItems: state.jobAdvertisementItems.filter((j) => j.id !== payload.id),
          };
        default:
            return state;;
    }
}