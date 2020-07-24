import React from "react";
import { connect } from "react-redux";

const ProfileItem = ({
  id,
  name,
  isEdit = false,
  isActive,
  iconClass,
  toggleActive,
}) => {
  const addEditClass = (isEdit) => (isEdit ? "" : " no-edit");
  const addActiveClass = (isActive) => (isActive ? " active" : "");
  const addIconClass = (iconClass) => (iconClass ? " " + iconClass : " custom");

  const handleClick = (id, name, isEdit) => {
    toggleActive(id, name, isEdit);
  };
  return (
    <div
      className={
        "profile-item " +
        addEditClass(isEdit) +
        addActiveClass(isActive) +
        addIconClass(iconClass)
      }
      onClick={() => handleClick(id, name, isEdit)}
    >
      {name}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    // profileActive: state.profile.profileActive,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleActive: (id, name, isEdit) => {
      dispatch({ type: "TOGGLE_ACTIVE", id, name, isEdit });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
