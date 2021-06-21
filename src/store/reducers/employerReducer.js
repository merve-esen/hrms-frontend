import { ADD_EMPLOYER, REMOVE_EMPLOYER } from "../actions/employerActions";
import { employerItems } from "../initialValues/employerItems";

const initialState = {
    employerItems: employerItems
}

export default function employerReducer(state=initialState, {type, payload}) {
    switch (type) {
        case ADD_EMPLOYER:
            return {
                ...state,
                employerItems: [...state.employerItems, payload],
              };
    case  REMOVE_EMPLOYER:
        return {
            ...state,
            employerItems: state.employerItems.filter((j) => j.id !== payload.id),
          };
        default:
            return state;;
    }
}