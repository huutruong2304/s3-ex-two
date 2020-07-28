import React from "react";
import Enzyme, { configure, mount } from "enzyme";
import Input from "./Input";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
// import { Provider } from "react-redux";
// import store from "../../../../store/store";
import data from "../../../../data/data.json";

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

describe("Component <Input />", () => {
  // let wrapper;
  const updateProfile = jest.fn();
  const toggleEdit = jest.fn();
  let store;
  let wrapper;

  const profileActive = {
    index: 0,
    id: 1,
    name: "something",
    isEdit: true,
  };

  beforeEach(() => {
    store = mockStore({
      profile: {
        data: data,
        profileActive: {
          index: 3,
          id: 3,
          name: "hahaha",
          isEdit: true,
        },
      },
    });

    wrapper = mount(
      <Input
        store={store}
        updateProfile={updateProfile}
        toggleEdit={toggleEdit}
      />
    );
  });

  it("rendered", () => {
    // console.log(wrapper.debug());
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  it("having value", () => {
    expect(wrapper.find("input").instance().value).toBe("hahaha");
  });
});
