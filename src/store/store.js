import { createStore, combineReducers } from "redux";

const profileInitialState = {
  //   data: [],
  profileActive: {
    id: 1,
    name: "asdas",
  },

  //   eqTitle: "",
};
const profile = (state = profileInitialState, action) => {
  switch (action.type) {
    case "TOGGLE_ACTIVE":
      return { ...state, profileActive: { id: action.id, name: action.name } };
    case "SET_DATA":
      return;
    default:
      return state;
  }
};

const toolbarInitialState = {
  isEdit: false,
};
const toolbar = (state = toolbarInitialState, action) => {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return { ...state, isEdit: !state.isEdit };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  profile,
  toolbar,
});

export default createStore(allReducers);
