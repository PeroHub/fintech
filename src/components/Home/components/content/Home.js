import React from "react";
import { useState } from "react";
import MainContent from "./MainContent";
import { Link } from "react-router-dom";
import Toggle from "../toggle/Toggle";
import { FaBars } from "react-icons/fa";
import "../../../index.css";
import { useAuth } from "../../../../contexts/AuthContext";

function Home() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { currentUser } = useAuth();

  const bar = {
    color: "#fff",
    fontSize: "2rem",
    position: "absolute",
    top: "30px",
    left: "20px",
  };

  const back = {
    background: "#fff",
  };

  const ret = {
    position: "absolute",
    left: "-470px",
    transition: "350ms",
  };

  return (
    <div className="overall">
      <nav>
        <div className="nav-con">
          <FaBars style={bar} onClick={showSidebar} className="bar" />
          <div className="logo">
            FuturePay<div></div>
          </div>
          <div className="nav-links">
            {/* <Link to="legal" className="link">
              Legal
            </Link> */}

            <Link to="faq" className="link">
              FAQ
            </Link>
            {currentUser ? (
              <Link to="/user/" className="link"> Dashboard</Link>
            ) : (
              <div className="for-links" style={{ display: "flex" }}>
                <Link to="login" className="link">
                  Login
                </Link>
                <Link className="sign link" to="signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div>
        <MainContent />
        <Toggle
          className="active"
          value={sidebar}
          styleguide={back}
          another={ret}
          show={showSidebar}
        />
      </div>
    </div>
  );
}

export default Home;
