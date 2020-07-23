import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileItem from "./profile-item/ProfileItem";
import Toolbar from "./toolbar/Toolbar";
import { v1 as uuidv1 } from "uuid";
import { connect } from "react-redux";
import Input from "./input/Input";
const profileData = [
  {
    id: 1,
    name: "default",
    isType: "",
    iconClass: "default",
  },
  { id: 2, name: "game", isType: "", iconClass: "game" },
  { id: 3, name: "movie", isType: "", iconClass: "movie" },
  { id: 4, name: "music", isType: "", iconClass: "music" },
  { id: 5, name: "custom 1", isType: "edit", iconClass: "custom" },
];

const Profile = ({ isEdit, profileActive, toggleActive }) => {
  const [data, setData] = useState([]);

  const handleAddProfile = () => {
    let id = uuidv1();
    let name = "custom";
    setData([
      ...data,
      {
        id,
        name,
      },
    ]);
    toggleActive(id, name);
  };

  useEffect(() => {
    let dataJSON = localStorage.getItem("data-profile");
    if (dataJSON === null) {
      localStorage.setItem("data-profile", JSON.stringify(profileData));
    }
    setData(JSON.parse(dataJSON));
  }, []);

  useEffect(() => {
    console.log("updated");
    localStorage.setItem("data-profile", JSON.stringify(data));
  }, [data]);

  return (
    <div id="profileWrapper" className="drawer-select flex">
      <div id="profileList" className="scrollable">
        {data.map((obj, index) => {
          return (
            <ProfileItem
              key={index + "-" + obj.id}
              id={obj.id}
              name={obj.name}
              isType={obj.isType}
              isActive={profileActive.id === obj.id ? true : false}
              iconClass={obj.iconClass}
            ></ProfileItem>
          );
        })}
        <Input top={4 * 30} isShow={isEdit}></Input>
      </div>
      <Toolbar handleAddProfile={handleAddProfile}></Toolbar>
      <div id="profileDelCfm" className="profile-del alert flex">
        <div className="title">delete eq</div>
        <div className="body-text t-center" id="delName">
          delete eq
        </div>
        <div className="thx-btn" id="cfmDelete">
          delete
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    profileActive: state.profile.profileActive,
    isEdit: state.toolbar.isEdit,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleActive: (id, name) => {
      dispatch({ type: "TOGGLE_ACTIVE", id, name });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
