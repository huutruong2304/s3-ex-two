import React from "react";
import Enzyme, { configure, shallow, mount } from "enzyme";
import Input from "./Input";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
// import { Provider } from "react-redux";
// import store from "../../../../store/store";
// import data from "../../../../data/data.json";

configure({ adapter: new Adapter() });

describe("Component <Input />", () => {
  // let wrapper;
  const updateProfile = jest.fn();
  const toggleEdit = jest.fn();
  const profileActive = {
    top: 0,
    profileActive: {
      index: 2,
      id: 1,
      name: "something",
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      // <p>ha</p>
      <Input
        profileActive={profileActive}
        updateProfile={updateProfile}
        toggleEdit={toggleEdit}
      />
    );
    wrapper.setState = {
      name: "",
    };
  });

  it("rendered", () => {
    console.log(wrapper.debug());
  });
});
// vẫn chưa ra dc cái th truyền props, store
