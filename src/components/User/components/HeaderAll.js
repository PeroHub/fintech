import React from "react";
import AppBar from "@mui/material/Button";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import UserToggle from "./UserToggle";
import { useAuth } from "../../../contexts/AuthContext";

//me
//me


export default function HeaderAll(props) {
  const [test, setTest] = useState(false);
  const toggleUserSideBar = () => setTest(!test);
  console.log("checking " + test);

  const { currentUser } = useAuth();
  

  const retUser = {
    position: "absolute",
    left: "0px",
    transition: "350ms",
  };

  return (
    <div>
      <AppBar position="static" className="appbar test">
        <FaBars className="header-bar" onClick={() => setTest(!test)} />
        <div className="text">
          <h3>{props.header}</h3>
        </div>
        <div className="side">
          <p>{currentUser.email?.split('@', 1)[0]}</p>
        </div>
      </AppBar>
      <UserToggle showUser={test} retUser={retUser} tog={toggleUserSideBar} />
    </div>
  );
}
