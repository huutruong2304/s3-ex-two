import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

const Alert = ({ profileActive, canDelete, toggleDelete, deleteProfile }) => {
  const alertPanel = useRef(null);

  const handleDelete = () => {
    deleteProfile();
    toggleDelete();
  };

  const handleClick = (event) => {
    if (event.target.getAttribute("id") === "cfmDelete") {
      handleDelete();
    } else {
      toggleDelete();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <div
      ref={alertPanel}
      id="profileDelCfm"
      className="profile-del alert flex show"
    >
      <div className="title">delete eq</div>
      <div className="body-text t-center" id="delName">
        {profileActive.name}
      </div>
      <div className="thx-btn" id="cfmDelete">
        delete
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.profile.data,
    profileActive: state.profile.profileActive,
    canDelete: state.toolbar.canDelete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setData: (data) => {
      dispatch({ type: "SET_DATA", data });
    },
    toggleDelete: () => {
      dispatch({ type: "TOGGLE_DELETE" });
    },
    deleteProfile: () => {
      dispatch({ type: "DELETE_PROFILE" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
