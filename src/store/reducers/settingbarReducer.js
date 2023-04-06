export const SettingbarReducer = (
    state = {
      signal: [],
    },
    action
  ) => {
    switch (action.type) {
      case "SSIGNAL":
        return Object.assign({}, state, {
          signal: action.payload.signal,
        });
  
      default:
        return state;
    }
  };
  