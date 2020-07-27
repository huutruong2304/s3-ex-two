import React from "react";
import { configure, shallow, mount } from "enzyme";
import Input from "./Input";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Component <Input />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Input></Input>);
  });
  it("rendered", () => {
    wrapper.setProps({
      top: 0,
      profileActive: {
        index: 2,
        id: 1,
        name: "something",
      },
    });
  });
});
// vẫn chưa ra dc cái th truyền props, store
