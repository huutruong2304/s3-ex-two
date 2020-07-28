import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

const Input = ({ profileActive, updateProfile, toggleEdit }) => {
  const inputName = useRef(null);
  const [name, setName] = useState("");
  const isChange = (event) => {
    // console.log(inputName.current.value);
    setName(event.target.value);
  };

  const updatedName = (name) => {
    updateProfile(name);
    toggleEdit();
    setName(profileActive.name);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && name.length > 0) {
      updatedName(name);
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.tagName !== "INPUT") {
      updatedName(name);
    }
  };
  useEffect(() => {
    // console.log(profileActive.index);
    setName(profileActive.name);
    if (inputName) {
      inputName.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  // const addClassShow = () => (isShow ? " show" : "");

  return (
    <input
      id="profileRename"
      className="profile-item show"
      placeholder="Enter Profile Name"
      maxLength={25}
      style={{ top: profileActive.index * 30 + "px" }}
      value={name}
      onChange={(event) => isChange(event)}
      onKeyPress={(event) => handleEnter(event)}
      ref={inputName}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    profileActive: state.profile.profileActive,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProfile: (name) => {
      dispatch({ type: "UPDATE_PROFILE", name });
    },
    toggleEdit: () => {
      dispatch({ type: "TOGGLE_EDIT" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
