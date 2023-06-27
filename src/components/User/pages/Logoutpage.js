import React, { useState } from "react";
import style from "../styles/logout.module.css";
import { icons } from '../../../assets'
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
// import Header from '../components/HeaderAll'

export default function Logoutpage() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  //logs the user out from the app
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch(e) {
      setError(e.message);
    }
  }


  return (
    <>
    <div className="logout">
        {/* shows error message if the logout operation fails */}
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {/* <Header header={header}/> */}
      <div className={style.container}>
        
        <div className={style.warning}>
          <div className={style.warning_icon}>
            <img src={icons.Warning} alt="warning icon" />
          </div>
          <div className={style.warning_text}>
            Are you sure you want to logout?
          </div>
          <div className={style.button_container}>
            <button onClick={handleLogout} className={style.button_yes}>
              Yes
            </button>
            <button className={style.button_no} type="submit">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
}
