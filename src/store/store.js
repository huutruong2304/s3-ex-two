import { createStore, combineReducers } from "redux";
import { v1 as uuidv1 } from "uuid";

const saveOnLocal = (data) => {
  const nameKey = "data-profile";
  localStorage.setItem(nameKey, JSON.stringify(data));
};

const profileInitialState = {
  data: [],
  profileActive: {
    index: 0,
    id: 1,
    name: "...",
    isEdit: false,
  },
};

const profile = (state = profileInitialState, action) => {
  switch (action.type) {
    case "GO_UP_DOWN":
      {
        if (
          (state.profileActive.index === 0 && action.go === -1) ||
          (state.profileActive.index === state.data.length - 1 &&
            action.go === 1)
        ) {
          return state;
        }
        // sẽ chuyền vào action.go giá trị mà muốn tăng hay giảm
        let index = state.profileActive.index + action.go;
        let profileActive = {
          ...state.profileActive,
          index,
          id: state.data[index].id,
          name: state.data[index].name,
          isEdit: state.data[index].isEdit || false,
        };
        return { ...state, profileActive };
      }
      break;
    case "TOGGLE_ACTIVE":
      {
        let index = state.data.findIndex((ele) => ele.id === action.id);
        return {
          ...state,
          profileActive: {
            ...state.profileActive,
            index,
            id: action.id,
            name: action.name,
            isEdit: action.isEdit,
          },
        };
      }
      break;
    case "SET_DATA":
      saveOnLocal(action.data);
      return { ...state, data: action.data };
      break;
    case "ADD_PROFILE":
      {
        let index = state.data.length;
        let id = uuidv1();
        let name = "custom";
        let isEdit = true;
        let data = [
          ...state.data,
          {
            index,
            id,
            name,
            isEdit,
          },
        ];
        saveOnLocal(data);
        return {
          ...state,
          data,
          profileActive: { ...state.profileActive, index, id, name, isEdit },
        };
      }
      break;
    case "UPDATE_PROFILE":
      {
        let updated = state.data.map((profile) => {
          if (profile.id === state.profileActive.id) {
            return { ...profile, name: action.name };
          }
          return profile;
        });
        saveOnLocal(updated);
        return {
          ...state,
          data: updated,
          profileActive: {
            ...state.profileActive,
            name: action.name,
          },
        };
      }
      break;
    case "DELETE_PROFILE":
      {
        if (state.profileActive.isEdit) {
          let filteredData = state.data.filter(
            (profile) => profile.id !== state.profileActive.id
          );

          let index = state.profileActive.index - 1;
          let profileActive = {
            ...state.profileActive,
            index,
            id: filteredData[index].id,
            name: filteredData[index].name,
            isEdit: filteredData[index].isEdit || false,
          };
          saveOnLocal(filteredData);
          return {
            ...state,
            data: filteredData,
            profileActive,
          };
        }
        return state;
      }
      break;
    default:
      return state;
  }
};

const toolbarInitialState = {
  canEdit: false,
  canDown: true,
  canUp: false,
  canDelete: false,
};
const toolbar = (state = toolbarInitialState, action) => {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return { ...state, canEdit: !state.canEdit };
    case "SET_CAN_UP":
      return { ...state, canUp: action.up };
    case "SET_CAN_DOWN":
      return { ...state, canDown: action.down };
    case "TOGGLE_DELETE":
      return { ...state, canDelete: !state.canDelete };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  profile,
  toolbar,
});

export default createStore(allReducers);
