export const SettingbarReducer2 = (
  state = {
    signal: [],
  },
  action
) => {
  switch (action.type) {
    case "SSIGNALL":
      return Object.assign({}, state, {
        signal: action.payload.signal,
      });

    default:
      return state;
  }
};
