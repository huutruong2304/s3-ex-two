import React from "react";
import { connect } from "react-redux";

const ProfileItem = ({
  id,
  name,
  isType = "",
  isActive,
  iconClass,
  toggleActive,
}) => {
  const addTypeClass = (isType) => (isType === "edit" ? "" : " no-edit");
  const addActiveClass = (isActive) => (isActive ? " active" : "");
  const addIconClass = (iconClass) => (iconClass ? " " + iconClass : " custom");

  const handleClick = (id, name) => {
    toggleActive(id, name);
  };
  return (
    <div
      className={
        "profile-item " +
        addTypeClass(isType) +
        addActiveClass(isActive) +
        addIconClass(iconClass)
      }
      onClick={() => handleClick(id, name)}
    >
      {name}
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
    toggleActive: (id, name) => {
      dispatch({ type: "TOGGLE_ACTIVE", id, name });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
