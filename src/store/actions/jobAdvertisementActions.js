export const ADD_JOB_ADVERTISEMENT= "ADD_JOB_ADVERTISEMENT"
export const REMOVE_JOB_ADVERTISEMENT= "REMOVE_JOB_ADVERTISEMENT"

export function add(jobAdvertisement){
    return {
        type: ADD_JOB_ADVERTISEMENT,
        payload: jobAdvertisement
    }
}

export function remove(jobAdvertisement){
    return {
        type: REMOVE_JOB_ADVERTISEMENT,
        payload: jobAdvertisement
    }
}