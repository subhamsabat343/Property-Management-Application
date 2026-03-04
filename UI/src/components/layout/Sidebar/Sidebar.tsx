import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Engineering as MaintenanceIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { label: "Dashboard", path: "/", icon: DashboardIcon },
  { label: "Properties", path: "/properties", icon: BusinessIcon },
  { label: "Tenants", path: "/tenants", icon: PeopleIcon },
  { label: "Maintenance", path: "/maintenance", icon: MaintenanceIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const theme = useTheme();
  const location = useLocation();

  const sidebarWidth = isCollapsed ? 80 : 260;

  return (
    <Drawer
      variant="permanent"
      id="main-sidebar"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          bgcolor: "white",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", height: 64 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          <HomeIcon />
        </Box>
        {!isCollapsed && (
          <Box sx={{ ml: 2, overflow: "hidden" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              PropManager
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              Property Suite
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      {/* Navigation Section */}
      <Box sx={{ mt: 2, px: 2, mb: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.6 }}
        >
          {!isCollapsed && "Main Menu"}
        </Typography>
      </Box>

      <List sx={{ px: 1.5 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1.2 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: "14px",
                  minHeight: 48,
                  px: 2.5,
                  mx: 1.5,
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
                  bgcolor: isActive 
                    ? alpha(theme.palette.primary.main, 0.08) 
                    : "transparent",
                  color: isActive ? "primary.main" : "text.secondary",
                  border: "1px solid",
                  borderColor: isActive 
                    ? alpha(theme.palette.primary.main, 0.1) 
                    : "transparent",
                  "&:hover": {
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.12)
                      : alpha(theme.palette.primary.main, 0.04),
                    transform: isActive ? "none" : "translateY(-2px)",
                    boxShadow: isActive 
                      ? "none" 
                      : `0 8px 16px ${alpha(theme.palette.common.black, 0.05)}`,
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                      transform: "scale(1.1) rotate(-5deg)",
                    },
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                {isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "25%",
                      bottom: "25%",
                      width: 4,
                      bgcolor: "primary.main",
                      borderRadius: "0 8px 8px 0",
                      boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.6)}`,
                    }}
                  />
                )}
                <ListItemIcon
                  sx={{
                    minWidth: 42,
                    color: isActive ? "primary.main" : "inherit",
                    transition: "inherit",
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 800 : 600,
                      letterSpacing: "0.02em",
                      sx: { transition: "inherit" },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Toggle Button at the bottom */}
      <Box sx={{ mt: "auto", p: 1, display: "flex", justifyContent: isCollapsed ? "center" : "flex-end" }}>
        <IconButton onClick={onToggle} size="small">
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
