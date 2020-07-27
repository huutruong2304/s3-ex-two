import React, { useEffect } from "react";
import Btn from "./btn/Btn";
import { connect } from "react-redux";

const Toolbar = ({
  data,
  profileActive,
  toggleActive,
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

  // const setDefaultActive = (id, name) => {
  //   toggleActive(id, name);
  // };
  // useEffect(() => {
  //   setDefaultActive(1, "default");
  // }, []);
  useEffect(() => {
    // console.log("toolbar");
    if (profileActive.index === 0) {
      setCanUp(false);
    } else {
      setCanUp(true);
    }
    if (profileActive.index === data.length - 1) {
      setCanDown(false);
    } else {
      setCanDown(true);
    }
    // console.log("up" + canUp + "-down" + canDown);
  }, [profileActive]);

  const handleGoUp = () => {
    console.log(canUp);
    goUpDown(-1);
    if (profileActive.index === 0) {
      console.log("min");
      setCanUp(false);
    } else {
      setCanUp(true);
    }
  };
  const handleGoDown = () => {
    goUpDown(+1);
    console.log(canDown);
    if (profileActive.index === data.length - 1) {
      console.log("max");
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
    toggleActive: (id, name) => {
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
    setCanUp: (up) => {
      dispatch({ type: "SET_CAN_UP", up });
    },
    setCanDown: (down) => {
      dispatch({ type: "SET_CAN_DOWN", down });
    },
    goUpDown: (go) => [dispatch({ type: "GO_UP_DOWN", go })],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
