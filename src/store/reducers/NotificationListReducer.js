import { NOTIFICATION_LIST_DATA } from "../ActionTypes";

export const NotificationsListReducer = (
  state = {
    notificationsListData: [],
  },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_LIST_DATA:
      return Object.assign({}, state, {
        notificationsListData: [...action.payload.notificationsListData],
      });
    default:
      return state;
  }
};
