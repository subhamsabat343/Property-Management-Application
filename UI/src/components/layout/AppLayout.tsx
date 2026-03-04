import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, LinearProgress } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const PageLoader: React.FC = () => (
  <Box sx={{ width: "100%", mt: -3, position: "fixed", top: 64, left: 0, zIndex: 1201 }}>
    <LinearProgress color="primary" sx={{ height: 3 }} />
  </Box>
);

const AppLayout: React.FC = () => {
  const theme = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }} id="app-layout">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px", // Height of Navbar
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Navbar isSidebarCollapsed={isSidebarCollapsed} />
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default AppLayout;
