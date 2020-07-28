import React from "react";
import configureStore from "redux-mock-store";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Profile from "./Profile";
// import store from "../../../store/store";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import data from "../../../data/data.json";
import Toolbar from "./toolbar/Toolbar";

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

describe("My component <Profile />", () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore({
      profile: {
        data: data,
        profileActive: {
          index: 3,
          id: 3,
          name: "game",
          isEdit: true,
        },
      },
      toolbar: {
        canEdit: true,
        canDelete: false,
      },
    });
    // store.dispatch = jest.fn();
    wrapper = shallow(<Profile store={store} />);
  });

  it("rendered", () => {
    console.log(wrapper.debug());
    expect(wrapper).not.toBeNull();
  });
});
