export const ADD_EMPLOYER= "ADD_EMPLOYER"
export const REMOVE_EMPLOYER= "REMOVE_EMPLOYER"

export function add(employer){
    return {
        type: ADD_EMPLOYER,
        payload: employer
    }
}

export function remove(employer){
    return {
        type: REMOVE_EMPLOYER,
        payload: employer
    }
}