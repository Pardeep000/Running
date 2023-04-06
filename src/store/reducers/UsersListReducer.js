import {
  USERS_LIST_SEARCH_INPUT_TEXT,
  USERS_LIST_SEARCH_TEXT,
  USERS_LIST_DATA,
  USERS_LIST_DATAS,
  AGENTS_LIST_DATA,
  USERS_LIST_SUBSCRIPTION_DATA,
  USERS_LIST_SELECTED_USER,
  USERS_LIST_CONTEXT_MENU_POS_AND_OBJECT_DETAILS,
} from "../ActionTypes";

export const UsersListReducer = (
  state = {
    usersListSearchInputText: "",
    usersListSearchText: "",
    usersListData: [],
    usersListDatas: [],
    agentsListData: [],
    usersListSubscriptionData: null,
    usersListSelectedUser: null,
    usersListContextMenuPosAndObjectDetails: null
  },
  action
) => {
  switch (action.type) {
    case USERS_LIST_SEARCH_INPUT_TEXT:
      return Object.assign({}, state, {
        usersListSearchInputText: action.payload.usersListSearchInputText,
      });
    case USERS_LIST_SEARCH_TEXT:
      return Object.assign({}, state, {
        usersListSearchText: action.payload.usersListSearchText,
      });
    case USERS_LIST_DATA:
      return Object.assign({}, state,{
        usersListData:action.payload.usersListData
      }
      
        );
        case USERS_LIST_DATAS:
         
          return Object.assign({}, state,
            action.payload.page === 0 ? {
              usersListDatas: [...action.payload.usersListData],
            } : { usersListDatas: [...state.usersListDatas, ...action.payload.usersListData] });
        case AGENTS_LIST_DATA:
          return Object.assign({}, state,
            action.payload.page === 0 ? {
              agentsListData: [...action.payload.agentsListData],
            } : { agentsListData: [...new Set(action.payload.agentsListData)] });
    case USERS_LIST_SUBSCRIPTION_DATA:
      return Object.assign({}, state, {
        usersListSubscriptionData: action.payload.usersListSubscriptionData,
      });
    case USERS_LIST_SELECTED_USER:
      return Object.assign({}, state, {
        usersListSelectedUser: action.payload.usersListSelectedUser,
      });
    case USERS_LIST_CONTEXT_MENU_POS_AND_OBJECT_DETAILS:
      return Object.assign({}, state, {
        usersListContextMenuPosAndObjectDetails: action.payload.usersListContextMenuPosAndObjectDetails,
      });
    default:
      return state;
  }
};
