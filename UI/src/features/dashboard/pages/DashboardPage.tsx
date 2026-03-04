import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  LinearProgress,
  Link,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Business as BuildingIcon,
  People as UsersIcon,
  CurrencyExchange as DollarSignIcon,
  TrendingUp as TrendingUpIcon,
  Engineering as MaintenanceIcon,
  Home as HomeIcon,
  OpenInNew as ArrowUpRightIcon,
} from "@mui/icons-material";
import {
  mockDashboardStats,
  mockProperties,
  mockMaintenanceRequests,
} from "../../../data/mockData";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend?: { value: number; isPositive: boolean };
}> = ({ title, value, subtitle, icon, color, trend }) => (
  <Card sx={{ height: "100%", borderRadius: 3, position: "relative", overflow: "hidden" }}>
    <Box sx={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", bgcolor: color }} />
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color: color, display: "flex" }}>
          {icon}
        </Box>
        {trend && (
          <Chip
            size="small"
            label={`${trend.isPositive ? "+" : ""}${trend.value}%`}
            color={trend.isPositive ? "success" : "error"}
            sx={{ fontWeight: 700, borderRadius: 1.5, height: 24 }}
          />
        )}
      </Stack>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const stats = mockDashboardStats;
  const recentProperties = mockProperties.slice(0, 4);
  const recentMaintenance = mockMaintenanceRequests.filter(
    (m) => m.status === "open" || m.status === "in-progress"
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "error";
      case "medium": return "warning";
      case "low": return "info";
      default: return "default";
    }
  };

  return (
    <Box id="dashboard-page">
      {/* Welcome Banner */}
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Welcome back, <Box component="span" sx={{ color: alpha("#fff", 0.9) }}>Subham</Box> 👋
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Here's what's happening with your properties today.
          </Typography>
        </Box>
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 250,
            height: 250,
            borderRadius: "50%",
            bgcolor: alpha("#fff", 0.1),
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            right: 150,
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: alpha("#fff", 0.05),
          }}
        />
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Properties"
            value={stats.totalProperties}
            subtitle={`${stats.totalUnits} total units`}
            icon={<BuildingIcon />}
            trend={{ value: 12, isPositive: true }}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            subtitle={`${stats.occupiedUnits} of ${stats.totalUnits} units`}
            icon={<TrendingUpIcon />}
            trend={{ value: 3.2, isPositive: true }}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(stats.monthlyRevenue)}
            subtitle="Across all properties"
            icon={<DollarSignIcon />}
            trend={{ value: 8.5, isPositive: true }}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Tenants"
            value={stats.totalTenants}
            subtitle={`${stats.vacantUnits} units available`}
            icon={<UsersIcon />}
            color={theme.palette.warning.main}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Recent Properties Section */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: "primary.main", display: "flex" }}>
                <HomeIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Recent Properties</Typography>
            </Stack>
            <Button
              component={Link}
              href="/properties"
              endIcon={<ArrowUpRightIcon fontSize="small" />}
              size="small"
              sx={{ fontWeight: 700 }}
            >
              View All
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {recentProperties.map((property) => (
              <Grid size={{ xs: 12, sm: 6 }} key={property.id}>
                <Card sx={{ borderRadius: 3, height: "100%", "&:hover": { boxShadow: theme.shadows[4] }, transition: "box-shadow 0.3s" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                      <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.common.black, 0.05), color: "text.secondary", display: "flex" }}>
                        <BuildingIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Chip
                        label={property.status}
                        size="small"
                        color={property.status === "active" ? "success" : "warning"}
                        variant="outlined"
                        sx={{ fontWeight: 700, fontSize: 10, height: 20 }}
                      />
                    </Stack>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>{property.name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: "block", mb: 2 }}>
                      {property.address}, {property.city}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Occupancy</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800 }}>{property.occupancyRate}%</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={property.occupancyRate}
                      sx={{ height: 6, borderRadius: 3, bgcolor: alpha(theme.palette.success.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: "success.main" } }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Maintenance Requests Section */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.error.main, 0.1), color: "error.main", display: "flex" }}>
                <MaintenanceIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Active Requests</Typography>
            </Stack>
            <Button
              component={Link}
              href="/maintenance"
              endIcon={<ArrowUpRightIcon fontSize="small" />}
              size="small"
              sx={{ fontWeight: 700 }}
              color="error"
            >
              View All
            </Button>
          </Stack>

          <Stack spacing={2}>
            {recentMaintenance.length > 0 ? (
              recentMaintenance.map((request) => (
                <Card key={request.id} sx={{ borderRadius: 3, border: "1px solid", borderColor: alpha(theme.palette.divider, 0.5), transition: "transform 0.2s", "&:hover": { transform: "translateX(4px)", borderColor: theme.palette.primary.main } }}>
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{request.title}</Typography>
                      <Chip
                        label={request.priority}
                        size="small"
                        color={getPriorityColor(request.priority) as "error" | "warning" | "info" | "default"}
                        sx={{ fontWeight: 800, fontSize: 9, height: 18 }}
                      />
                    </Stack>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: "block", mb: 1.5 }}>
                      {request.propertyName} • {request.tenantName}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Chip
                        label={request.status}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 700, fontSize: 10, height: 20 }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {new Date(request.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box sx={{ p: 4, textAlign: "center", bgcolor: alpha(theme.palette.common.black, 0.02), borderRadius: 4 }}>
                <MaintenanceIcon sx={{ fontSize: 40, color: "text.disabled", mb: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>No active maintenance requests</Typography>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
