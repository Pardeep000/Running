export const StateControlReducer = (
  state = {
    signal: [],
  },
  action
) => {
  switch (action.type) {
    case "SIGNAL":
      return Object.assign({}, state, {
        signal: action.payload.signal,
      });

    default:
      return state;
  }
};
