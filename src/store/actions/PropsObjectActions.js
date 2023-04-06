import { PROPS_OBJECT } from "../ActionTypes";

export const setPropsObjectData = (propsObjectData) => {
  return {
    type: PROPS_OBJECT,
    payload: {
      propsObjectData: propsObjectData,
    },
  };
};
