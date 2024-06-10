import React, { useState } from "react";
import NavigationLink from "./NavigationLink";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function Esidebar() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <Box className="sidebar">
      <Box className="sidebar-logo-container">
        <img
          className="sidebar-logo"
          src="../../src/assets/sidebar-logo.png"
          alt="Logo"
        />
      </Box>

      {/* Navigation links */}
      <Box className="navigation-links">
        <List>
          <NavigationLink
            icon={<SpaceDashboardIcon />}
            text="Dashboard"
            isActive={activeSection === "dashboard"}
            onClick={() => handleNavigation("dashboard")}
          />
          <NavigationLink
            icon={<AccessTimeFilledIcon />}
            text="Sessions"
            isActive={activeSection === "sessions"}
            onClick={() => handleNavigation("sessions")}
          />
          <NavigationLink
            icon={<DonutSmallIcon />}
            text="Data"
            isActive={activeSection === "milking-data"}
            onClick={() => handleNavigation("milking-data")}
          />
          <NavigationLink
            icon={<WaterDropIcon />}
            text="Storage"
            isActive={activeSection === "storage"}
            onClick={() => handleNavigation("storage")}
          />
          <NavigationLink
            icon={<AssessmentIcon />}
            text="Reports"
            isActive={activeSection === "reports"}
            onClick={() => handleNavigation("reports")}
          />
        </List>
      </Box>

      {/* Profile and Logout */}
      <Box className="user-actions">
        <List>
          <NavigationLink
            icon={<AccountCircleIcon />}
            text="Profile"
            isActive={activeSection === "profile"}
            onClick={() => handleNavigation("profile")}
          />
          <NavigationLink
            icon={<LogoutIcon />}
            text="Logout"
            isActive={activeSection === "logout"}
            onClick={() => handleNavigation("logout")}
          />
        </List>
      </Box>
    </Box>
  );
}

export default Esidebar;
