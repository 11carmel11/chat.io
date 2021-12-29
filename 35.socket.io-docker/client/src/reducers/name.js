const nameReducer = (state = "", action) => {
  const { type, name } = action;
  switch (type) {
    case "SET_NAME":
      return name;

    default:
      return state;
  }
};
export default nameReducer;
