import React from "react";
import "../../User/styles/usertoggle.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

// Images
import { icons } from "../../../assets";

const AdminToggle = (props) => {
  console.log(props);

  // custome design
  const cursor = {
    cursor: "pointer",
    color: "#6C757D",
  };

  return (
    <div className="user-toggle" style={props.showUser ? props.retUser : null}>
      <ClearIcon
        style={{
          position: "relative",
          left: "85%",
          top: "30px",
          fontSize: "1.5rem",
        }}
        className="clear"
        onClick={props.tog}
      ></ClearIcon>
      <div className="z-index  pt-4 px-2 shadow point">
        <div className="py-2 text-muted text-center">
          <h5>
            <strong>
              FuturePay<sup>&#8226;</sup>
            </strong>
          </h5>
        </div>
        <Link to="/user/home">
          <div className="pt-4   pb-3 sidebarhome " style={cursor}>
            <img src={icons.home2} alt="home" />
            <p>Home</p>
          </div>
        </Link>

        <Link to="/cash/dashboard">
          <div className="py-3 sidebarhome" style={cursor}>
            <img src={icons.dashboard} alt="rotate" />
            <p>Dashboard</p>
          </div>
        </Link>

        <Link to="/cash/transaction">
          <div className="py-3 sidebarhome" style={cursor}>
            <img src={icons.transaction} alt="wallet" />
            <p>Transaction</p>
          </div>
        </Link>

        <Link to="/cash/profile">
          <div className="py-3 sidebarhome " style={cursor}>
            <img src={icons.customer} alt="transaction" />
            <p>Customer Profiles</p>
          </div>
        </Link>

        <hr className="mr-3 bg-dark" />

        <Link to="/cash/analysis">
          <div className=" sidebarhome " style={cursor}>
            <img src={icons.Analysis} alt="profile" />
            <p>Analysis</p>
          </div>
        </Link>

        <Link to="/cash/settings">
          <div className="py-3 sidebarhome " style={cursor}>
            <img src={icons.set} alt="settings" />
            <p>Settings</p>
          </div>
        </Link>
        <Link to="/cash/logout">
          <div className="py-3 vh-100 sidebarhome" style={cursor}>
            <img src={icons.envelope} alt="envelope" />
            <p>Log out</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminToggle;
