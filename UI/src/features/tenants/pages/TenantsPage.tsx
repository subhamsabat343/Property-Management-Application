import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import {
  People as UsersIcon,
  Add as PlusIcon,
  Search as SearchIcon,
  Email as MailIcon,
  Phone as PhoneIcon,
  Business as BuildingIcon,
} from "@mui/icons-material";
import { mockTenants, mockProperties } from "../../../data/mockData";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: { value: number; isPositive: boolean };
}> = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: "100%", borderRadius: 3 }}>
    <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color: color, mr: 2.5, display: "flex" }}>
        {icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, display: "block" }}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>{value}</Typography>
          {trend && (
            <Chip
              size="small"
              label={`${trend.isPositive ? "+" : ""}${trend.value}%`}
              color={trend.isPositive ? "success" : "error"}
              variant="outlined"
              sx={{ fontWeight: 700, height: 20, fontSize: 10 }}
            />
          )}
        </Stack>
      </Box>
    </CardContent>
  </Card>
);

const TenantsPage: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTenants = mockTenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeTenants = mockTenants.filter((t) => t.status === "active").length;
  const pendingTenants = mockTenants.filter((t) => t.status === "pending").length;
  const totalRent = mockTenants
    .filter((t) => t.status === "active")
    .reduce((sum, t) => sum + t.monthlyRent, 0);

  const getPropertyName = (propertyId: string) => {
    return mockProperties.find((p) => p.id === propertyId)?.name || "Unknown";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string): "success" | "warning" | "error" | "default" => {
    switch (status.toLowerCase()) {
      case "active": return "success";
      case "pending": return "warning";
      case "expired": return "error";
      default: return "default";
    }
  };

  return (
    <Box id="tenants-page">
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Tenants"
            value={mockTenants.length}
            icon={<UsersIcon />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Leases"
            value={activeTenants}
            icon={<UsersIcon />}
            trend={{ value: 5, isPositive: true }}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Approval"
            value={pendingTenants}
            icon={<UsersIcon />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Monthly Rent"
            value={formatCurrency(totalRent)}
            icon={<UsersIcon />}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>

      {/* Toolbar Section */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ py: 1.5, px: 2 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            spacing={2}
          >
            <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
              <TextField
                placeholder="Search tenants..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />,
                }}
                sx={{ width: { xs: "100%", md: 350 } }}
              />
              <TextField
                select
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ width: 150 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
              </TextField>
            </Stack>

            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              id="add-tenant-btn"
            >
              Add Tenant
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: theme.shadows[1] }}>
        <Table>
          <TableHead sx={{ bgcolor: alpha(theme.palette.common.black, 0.02) }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>Tenant</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Property / Unit</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Monthly Rent</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Lease End</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {tenant.name.split(" ").map((n: string) => n[0]).join("")}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{tenant.name}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{tenant.email}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
                      <BuildingIcon sx={{ fontSize: 14, mr: 0.5, opacity: 0.6 }} />
                      {getPropertyName(tenant.propertyId)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Unit {tenant.unitNumber}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatCurrency(tenant.monthlyRent)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {new Date(tenant.leaseEnd).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tenant.status}
                    size="small"
                    color={getStatusColor(tenant.status)}
                    variant="outlined"
                    sx={{ fontWeight: 800, textTransform: "capitalize", height: 24 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Send Email">
                      <IconButton size="small" sx={{ bgcolor: alpha(theme.palette.info.main, 0.08), color: "info.main", "&:hover": { bgcolor: alpha(theme.palette.info.main, 0.15) } }}>
                        <MailIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Call Tenant">
                      <IconButton size="small" sx={{ bgcolor: alpha(theme.palette.success.main, 0.08), color: "success.main", "&:hover": { bgcolor: alpha(theme.palette.success.main, 0.15) } }}>
                        <PhoneIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TenantsPage;
