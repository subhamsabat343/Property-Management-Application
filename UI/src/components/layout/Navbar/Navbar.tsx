import React from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

interface NavbarProps {
  isSidebarCollapsed: boolean;
}

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/properties": "Properties",
  "/tenants": "Tenants",
  "/maintenance": "Maintenance",
};

const Navbar: React.FC<NavbarProps> = ({ isSidebarCollapsed }) => {
  const location = useLocation();
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const pageTitle = PAGE_TITLES[location.pathname] || "Dashboard";

  const sidebarWidth = isSidebarCollapsed ? 80 : 260;

  return (
    <AppBar
      position="fixed"
      id="main-navbar"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${sidebarWidth}px)` },
        ml: { sm: `${sidebarWidth}px` },
        bgcolor: "white",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>
          {pageTitle}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* Search Box */}
          <Box
            sx={{
              position: "relative",
              borderRadius: "8px",
              bgcolor: alpha(theme.palette.common.black, 0.05),
              "&:hover": {
                bgcolor: alpha(theme.palette.common.black, 0.08),
              },
              mr: 2,
              ml: 0,
              width: "100%",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              px: 1,
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search properties, tenants..."
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "inherit",
                "& .MuiInputBase-input": {
                  py: 1,
                  width: "200px",
                  fontSize: 14,
                },
              }}
            />
            <Box
              sx={{
                px: 0.5,
                py: 0.2,
                bgcolor: "white",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "4px",
                fontSize: 10,
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              ⌘K
            </Box>
          </Box>

          {/* Theme Toggle */}
          <IconButton onClick={() => setIsDarkMode(!isDarkMode)} id="theme-toggle">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Notifications */}
          <IconButton id="notifications-btn">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <Box
            id="user-profile"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              ml: 1,
              cursor: "pointer",
              p: 0.5,
              px: 1,
              borderRadius: "12px",
              transition: "all 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
              border: "1px solid",
              borderColor: "transparent",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                borderColor: alpha(theme.palette.primary.main, 0.1),
                transform: "translateY(-1px)",
                boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
                "& .MuiAvatar-root": {
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: 14 }}>SS</Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                Subham S.
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                Admin
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
