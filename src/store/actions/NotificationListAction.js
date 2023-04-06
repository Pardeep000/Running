import { NOTIFICATION_LIST_DATA } from "../ActionTypes";

export const setNotificationsListData = (notificationsListData = []) => {
  return {
    type: NOTIFICATION_LIST_DATA,
    payload: {
      notificationsListData: notificationsListData,
    },
  };
};
