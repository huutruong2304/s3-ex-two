import React, { useEffect } from "react";
import "./Profile.css";
import ProfileItem from "./profile-item/ProfileItem";
import Toolbar from "./toolbar/Toolbar";
import { connect } from "react-redux";
import Input from "./input/Input";
import dataProfile from "../../../data/data.json";
import Alert from "./alert/Alert";

const Profile = ({ data, setData, canEdit, canDelete, profileActive }) => {
  //it will initialize in first time
  useEffect(() => {
    let dataJSON = localStorage.getItem("data-profile");
    if (dataJSON === null) {
      setData(dataProfile);
    } else {
      setData(JSON.parse(dataJSON));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://reqres.in/api/users")
        .then((res) => res.json())
        .then((result) => console.log(result));
    }, 3000);
  }, [data]);

  const renderInput = (canEdit, top) => {
    if (canEdit) {
      return <Input top={top * 30}></Input>;
    } else return null;
  };

  const renderAlert = (canDelete) => {
    if (canDelete) {
      return <Alert></Alert>;
    } else return null;
  };

  const displayProfileItems = (profiles) => {
    if (!profiles) {
      return null;
    }
    return profiles.map((profile, index) => {
      return (
        <ProfileItem
          key={index + "-" + profile.id}
          id={profile.id}
          name={profile.name}
          isEdit={profile.isEdit}
          isActive={profile.id === profileActive.id ? true : false}
          iconClass={profile.iconClass}
        ></ProfileItem>
      );
    });
  };

  return (
    <div id="profileWrapper" className="drawer-select flex">
      <div id="profileList" className="scrollable">
        {displayProfileItems(data)}
        {renderInput(canEdit, profileActive.index)}
      </div>
      <Toolbar></Toolbar>
      {renderAlert(canDelete)}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.profile.data,
    profileActive: state.profile.profileActive,
    canEdit: state.toolbar.canEdit,
    canDelete: state.toolbar.canDelete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setData: (data) => {
      dispatch({ type: "SET_DATA", data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
