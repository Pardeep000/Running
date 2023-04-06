import {
    ALL_DESIGNATION_DATA,
    ALL_PAGES_DATA,
    ALL_USERS_DATA
} from '../ActionTypes';

export const setAllDesginationData = (alldesignationdata)=>{
    return {
        type: ALL_DESIGNATION_DATA,
        payload: {
            alldesignationdata: alldesignationdata,
        },
      };
}

export const setAllPagesData = (allpagesdata)=>{
    return {
        type: ALL_PAGES_DATA,
        payload: {
            allpagesdata: allpagesdata,
        },
      };
}
export const setAllUsersData = (allusersdata)=>{
    return {
        type: ALL_USERS_DATA,
        payload: {
            allusersdata: allusersdata,
        },
      };
}
