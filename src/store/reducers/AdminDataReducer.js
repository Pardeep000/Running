import { ALL_PAGES_DATA, ALL_USERS_DATA, ALL_DESIGNATION_DATA } from "../ActionTypes";

export const AdminDataReducer = (
  state = {
    allusersdata: [],
    alldesignationdata:[],
    allpagesdata:[]
  },
  action
) => {
  switch (action.type) {
    case ALL_USERS_DATA:
      return Object.assign({}, state, {
        allusersdata: action.payload.allusersdata,
      });
      case ALL_PAGES_DATA:
        return Object.assign({}, state, {
            allpagesdata: action.payload.allpagesdata,
        });
        case ALL_DESIGNATION_DATA:
        return Object.assign({}, state, {
            alldesignationdata: action.payload.alldesignationdata,
        });
    default:
      return state;
  }
};
