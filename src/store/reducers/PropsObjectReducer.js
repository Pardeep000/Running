import { PROPS_OBJECT } from "../ActionTypes";

export const PropsObjectDataReducer = (
  state = {
    propsObjectData: [],
  },
  action
) => {
  switch (action.type) {
    case PROPS_OBJECT:
      return Object.assign({}, state, {
        propsObjectData: [action.payload.propsObjectData],
      });
    default:
      return state;
  }
};
