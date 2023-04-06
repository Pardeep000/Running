export const TablerowReducer = (
  state = {
    tablerow: [],
  },
  action
) => {
  switch (action.type) {
    case "TABLE_ROW":
      return Object.assign({}, state, {
        tablerow: action.payload.tablerow,
      });

    default:
      return state;
  }
};
