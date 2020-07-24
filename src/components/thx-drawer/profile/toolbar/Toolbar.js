import React from "react";
import Btn from "./btn/Btn";
import { connect } from "react-redux";

const Toolbar = ({
  data,
  profileActive,
  toggleEdit,
  toggleDelete,
  addProfile,
  canDown,
  canUp,
  setCanUp,
  setCanDown,
  goUpDown,
}) => {
  const handleAdd = () => {
    addProfile();
  };
  const handleDelete = () => {
    // deleteProfile();
    toggleDelete();
  };

  const handleGoUp = () => {
    console.log("up");
    goUpDown(-1);
    if (profileActive.index === 0) {
      console.log("1");
      setCanUp(false);
    } else {
      setCanUp(true);
    }
  };
  const handleGoDown = () => {
    goUpDown(+1);
    console.log("down");
    if (profileActive.index === data.length) {
      setCanDown(false);
    } else {
      setCanDown(true);
    }
  };

  return (
    <div className="toolbar flex">
      <Btn isType="add" handleClick={() => handleAdd()}></Btn>
      <Btn
        isType="edit"
        isShow={profileActive.isEdit}
        handleClick={toggleEdit}
      ></Btn>
      <Btn
        isType="delete"
        isShow={profileActive.isEdit}
        handleClick={() => handleDelete()}
      ></Btn>
      <Btn
        isType="down"
        isDisable={!canDown}
        handleClick={() => handleGoDown()}
      ></Btn>
      <Btn
        isType="up"
        isDisable={!canUp}
        handleClick={() => handleGoUp()}
      ></Btn>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.profile.data,
    profileActive: state.profile.profileActive,
    canUp: state.toolbar.canUp,
    canDown: state.toolbar.canDown,
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
    toggleDelete: () => {
      dispatch({ type: "TOGGLE_DELETE" });
    },
    addProfile: () => {
      dispatch({ type: "ADD_PROFILE" });
    },
    setCanUp: () => {
      dispatch({ type: "SET_CAN_UP" });
    },
    setCanDown: () => {
      dispatch({ type: "SET_CAN_DOWN" });
    },
    goUpDown: (go) => [dispatch({ type: "GO_UP_DOWN", go })],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
