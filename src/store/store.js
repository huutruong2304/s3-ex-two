import { createStore, combineReducers } from "redux";
import { v1 as uuidv1 } from "uuid";

const saveOnLocal = (data) => {
  const nameKey = "data-profile";
  localStorage.setItem(nameKey, JSON.stringify(data));
};

const swap2ObjectArray = (arr = [], index1 = 0, index2 = 0) => {
  if (index2 === index1) {
    return arr;
  }
  return arr.map((ele, index) => {
    switch (index) {
      case index1:
        return arr[index2];
      case index2:
        return arr[index1];
      default:
        return ele;
    }
  });
};

const profileInitialState = {
  data: [],
  profileActive: {
    index: null,
    id: null,
    name: null,
    isEdit: null,
  },
};
const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case "GO_UP_DOWN": {
      // go = 1 là sẽ đi xuống 1
      // go = -1 là sẽ đi lên 1
      console.log("go up down");
      if (
        (state.profileActive.index === 0 && action.go === -1) ||
        (state.profileActive.index === state.data.length - 1 && action.go === 1)
      ) {
        return state;
      }
      // sẽ chuyền vào action.go giá trị mà muốn tăng hay giảm
      let index = state.profileActive.index + action.go;

      //chuyển 2 profile trong data
      let data = swap2ObjectArray(state.data, state.profileActive.index, index);

      // console.log(index);
      let profileActive = {
        ...state.profileActive,
        index,
        id: data[index].id,
        name: data[index].name,
        isEdit: data[index].isEdit || false,
      };
      saveOnLocal(data);
      return { ...state, data, profileActive };
    }
    // chỗ này nên cập nhật lại là truyền vào id r trong action này tự tìm ra thông tin của th kia thay vì phải pass vào 2 3 value id name
    case "TOGGLE_ACTIVE": {
      // console.log("toggle active");
      let index = state.data.findIndex((ele) => ele.id === action.id);
      return {
        ...state,
        profileActive: {
          ...state.profileActive,
          index,
          id: action.id,
          name: state.data[index].name,
          isEdit: state.data[index].isEdit || false,
        },
      };
    }

    case "SET_DATA":
      saveOnLocal(action.data);
      return { ...state, data: action.data };

    case "ADD_PROFILE": {
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

    case "UPDATE_PROFILE": {
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

    case "DELETE_PROFILE": {
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
const toolbarReducer = (state = toolbarInitialState, action) => {
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
  profile: profileReducer,
  toolbar: toolbarReducer,
});

const store = createStore(allReducers);
// store.subscribe(() => console.log(store.getState()));

export { store, profileReducer, toolbarReducer };
