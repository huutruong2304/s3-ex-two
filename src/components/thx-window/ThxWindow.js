import React from "react";
import { connect } from "react-redux";

const ThxWindow = ({ profileActive }) => {
  // console.log("thxwindow");
  // console.log(profileActive);
  return (
    <div className="thx-window">
      <div className="sub-title flex">
        <h1 id="eqTitle" className="eq-title">
          {profileActive.name}
        </h1>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    profileActive: state.profile.profileActive,
  };
};

export default connect(mapStateToProps)(ThxWindow);
