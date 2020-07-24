import React, { useEffect } from "react";
import "./App.css";
import ThxDrawer from "./components/thx-drawer/ThxDrawer";
import ThxWindow from "./components/thx-window/ThxWindow";
import { connect } from "react-redux";

function App({ setData }) {
  // const [data, setData] = useState([]);
  useEffect(() => {
    // console.log("app");
    // let dataJSON = localStorage.getItem("data-profile");
    // if (dataJSON === null) {
    //   console.log("empty");
    //   localStorage.setItem("data-profile", JSON.stringify(dataProfile));
    // }
    // setData(JSON.parse(dataJSON));
  }, []);
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <ThxDrawer></ThxDrawer>
        <ThxWindow></ThxWindow>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.profile.data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setData: (data) => {
      dispatch({ type: "SET_DATA", data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
