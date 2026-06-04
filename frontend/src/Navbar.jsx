import "./Navbar.css";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";

function Navbar() {

   const {
      showSidebar,
      setShowSidebar
    } = useContext(MyContext);


  return (
    <div className="navbar">
      <div className="sidebar-menu-display">
        <button
          className="menu-btn"
          onClick={()=>setShowSidebar(!showSidebar)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <span>
          SigmaGpt <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>

      <div className="userIconDiv">
        <span className="userIcon">
          <i className="fa-solid fa-user"></i>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
