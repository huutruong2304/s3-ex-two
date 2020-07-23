import React, { useState } from "react";

const Input = ({ top, isShow = false }) => {
  const [name, setName] = useState("");
  const isChange = (event) => {
    setName(event.target.value);
  };
  const addClassShow = () => (isShow ? " show" : "");
  return (
    <input
      id="profileRename"
      className={"profile-item" + addClassShow()}
      placeholder="Enter Profile Name"
      maxLength={25}
      style={{ top: top + "px" }}
      value={name}
      onChange={(event) => isChange(event)}
    />
  );
};

export default Input;
