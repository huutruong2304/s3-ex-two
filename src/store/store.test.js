import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import store, { profileReducer } from "./store";
import data from "../data/data.json";
// configure({ adapter: new Adapter() });

describe("test your producer store", () => {
  const initialState = {
    data,
    profileActive: {
      index: null,
      id: null,
      name: null,
      isEdit: null,
    },
  };
  it("should return initialState", () => {
    expect(profileReducer(undefined, {})).toEqual({
      data: [],
      profileActive: {
        index: null,
        id: null,
        name: null,
        isEdit: null,
      },
    });
  });

  it("should set data return state with new data", () => {
    const setData = {
      type: "SET_DATA",
      data,
    };
    expect(profileReducer(initialState, setData)).toEqual({
      data,
      profileActive: {
        index: null,
        id: null,
        name: null,
        isEdit: null,
      },
    });
  });

  it("should go down", () => {
    const goDown = {
      type: "GO_UP_DOWN",
      go: 1,
    };
    const goState = {
      data,
      profileActive: {
        index: 0,
        id: 1,
        name: "default",
        isEdit: false,
      },
    };
    expect(profileReducer(goState, goDown)).toEqual({
      data: [
        { id: 2, name: "game", iconClass: "game" },
        { id: 1, name: "default", iconClass: "default" },
        { id: 3, name: "movie", iconClass: "movie" },
        { id: 4, name: "music", iconClass: "music" },
        { id: 5, name: "custom 1", isEdit: true, iconClass: "custom" },
      ],
      profileActive: {
        index: 1,
        id: 1,
        name: "default",
        isEdit: false,
      },
    });
  });

  it("should set toggle active", () => {
    const toggleActive = {
      type: "TOGGLE_ACTIVE",
      id: 2,
    };
    expect(profileReducer(initialState, toggleActive)).toEqual({
      ...initialState,
      profileActive: {
        index: 1,
        id: 2,
        name: "game",
        isEdit: false,
      },
    });
  });
});
