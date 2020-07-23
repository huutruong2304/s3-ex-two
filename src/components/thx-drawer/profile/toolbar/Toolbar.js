import React from "react";
import Btn from "./btn/Btn";
import { connect } from "react-redux";

const Toolbar = ({ handleAddProfile, toggleEdit }) => {
  const handleAdd = (type) => {
    console.log(type);
    handleAddProfile(type);
  };
  return (
    <div className="toolbar flex">
      <Btn isType="add" handleClick={handleAdd}></Btn>
      <Btn isType="edit" handleClick={toggleEdit}></Btn>
      <Btn isType="delete" isShow={false}></Btn>
      <Btn isType="down"></Btn>
      <Btn isType="up" isDisable={true}></Btn>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    profileActive: state.profile.profileActive,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleActive: (id) => {
      dispatch({ type: "TOGGLE_ACTIVE", id });
    },
    toggleEdit: () => {
      dispatch({ type: "TOGGLE_EDIT" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
