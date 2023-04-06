import {
  AGENTS_LIST_DATA,
} from "../ActionTypes";

export const setAgentsListData = (agentsListData, page) => {
  return {
    type: AGENTS_LIST_DATA,
    payload: {
      agentsListData: agentsListData,
    },
  };
};