import React from "react";

const Btn = ({ isType, isShow = true, isDisable = false, handleClick }) => {
  const addClassShow = (isShow) => (isShow ? " show" : "");
  const addClassDisable = (isDisable) => (isDisable ? " disabled" : "");
  return (
    <div
      className={
        "icon " + isType + addClassDisable(isDisable) + addClassShow(isShow)
      }
      onClick={() => handleClick(isType)}
    />
  );
};

export default Btn;
