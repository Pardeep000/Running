export const NotificationControl = (signal) => {
  return {
    type: "SIGNAL",
    payload: {
      signal: signal,
    },
  };
};
