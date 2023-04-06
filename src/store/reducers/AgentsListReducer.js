import {
  AGENTS_LIST_DATA,
} from "../ActionTypes";

export const AgentsListReducer = (
  state = {
    setAgentsListData: [],
  },
  action
) => {
  switch (action.type) {
    case AGENTS_LIST_DATA:
      return Object.assign({}, state,
        action.payload.page === 0 ? {
          setAgentsListData: [...action.payload.agentsListData],
        } : {
          setAgentsListData: [...state.setAgentsListData, ...action.payload.agentsListData]
        });
    default:
      return state;
  }
};
