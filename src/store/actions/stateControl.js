export const StateControl = (signal) => {
  return {
    type: "SIGNAL",
    payload: {
      signal: signal,
    },
  };
};
