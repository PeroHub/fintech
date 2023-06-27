import "./toggle.css";
// import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuth } from "../../../../contexts/AuthContext";

function Toggle(props) {
  const { currentUser } = useAuth();

  return (
    <div
      className="main"
      style={props.value ? props.styleguide : props.another}
    >
      <ClearIcon
        style={{ position: "relative", left: "85%", top: "20px" }}
        className="clear"
        onClick={props.show}
      ></ClearIcon>

      <div className="toggle">
        <p>
          Future Pay <sup>.</sup>
        </p>

        <div className="mobile-links">
          <Link to="legal">
            <a href="/">Legal</a>
          </Link>
          <Link to="faq">
            <a href="/">FAQ</a>
          </Link>
          {currentUser ? (
            <Link to="/user/"> Dashboard</Link>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link to="login">
                <a href="/">Login</a>
              </Link>
              <Link to="signup">
                <a href="/">Sign Up</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Toggle;
