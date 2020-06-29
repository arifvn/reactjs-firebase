const initialState = {
  isLogin: false,
  isLoading: false,
  user: {},
  userNotes: {},
};

const reducer = (state = initialState, action) => {
  if (action.type === "CHANGE_ISLOGIN") {
    return {
      ...state,
      isLogin: action.value,
    };
  }
  if (action.type === "CHANGE_USER") {
    return {
      ...state,
      user: action.value,
    };
  }
  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  if (action.type === "SET_NOTES") {
    return {
      ...state,
      userNotes: action.value,
    };
  }

  return state;
};

export default reducer;
