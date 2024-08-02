import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { user, logOut, loading } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <button
        className={activeSection === "overview" ? "active" : ""}
        onClick={() => setActiveSection("overview")}
      >
        Overview
      </button>
      <button
        className={activeSection === "control" ? "active" : ""}
        onClick={() => setActiveSection("control")}
      >
        Control
      </button>
      <button
        className={activeSection === "status" ? "active" : ""}
        onClick={() => setActiveSection("status")}
      >
        Status
      </button>
    </div>
  );
};

export default Sidebar;
