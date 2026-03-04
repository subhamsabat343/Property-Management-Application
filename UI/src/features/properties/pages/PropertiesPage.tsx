import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  LinearProgress,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Business as BuildingIcon,
  Add as PlusIcon,
  Search as SearchIcon,
  LocationOn as MapPinIcon,
  GridView as GridViewIcon,
  TableChart as TableViewIcon,
} from "@mui/icons-material";
import { mockProperties } from "../../../data/mockData";
import AddPropertyDialog from "../components/AddPropertyDialog";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card sx={{ height: "100%", borderRadius: 2 }}>
    <CardContent sx={{ display: "flex", alignItems: "center", p: 2.5 }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: alpha(color, 0.1),
          color: color,
          mr: 2,
          display: "flex",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: "block" }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const PropertiesPage: React.FC = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProperties = mockProperties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalUnits = mockProperties.reduce((sum, p) => sum + p.units, 0);
  const avgOccupancy =
    mockProperties.reduce((sum, p) => sum + p.occupancyRate, 0) / mockProperties.length;
  const totalRevenue = mockProperties.reduce((sum, p) => sum + p.monthlyRevenue, 0);

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
      case "maintenance": return "warning";
      case "vacant": return "error";
      default: return "default";
    }
  };

  return (
    <Box id="properties-page">
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Properties"
            value={mockProperties.length}
            icon={<BuildingIcon />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Units"
            value={totalUnits}
            icon={<BuildingIcon />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Avg. Occupancy"
            value={`${avgOccupancy.toFixed(1)}%`}
            icon={<BuildingIcon />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(totalRevenue)}
            icon={<BuildingIcon />}
            color={theme.palette.warning.main}
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
                placeholder="Search properties..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />,
                }}
                sx={{ width: { xs: "100%", md: 300 } }}
              />
              <TextField
                select
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ width: 140 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="vacant">Vacant</MenuItem>
              </TextField>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ bgcolor: alpha(theme.palette.common.black, 0.05), p: 0.5, borderRadius: 2 }}>
                <Tooltip title="Grid View">
                  <IconButton
                    size="small"
                    onClick={() => setViewMode("grid")}
                    color={viewMode === "grid" ? "primary" : "default"}
                    sx={{ bgcolor: viewMode === "grid" ? "white" : "transparent", borderRadius: 1.5, "&:hover": { bgcolor: "white" } }}
                  >
                    <GridViewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Table View">
                  <IconButton
                    size="small"
                    onClick={() => setViewMode("table")}
                    color={viewMode === "table" ? "primary" : "default"}
                    sx={{ bgcolor: viewMode === "table" ? "white" : "transparent", borderRadius: 1.5, "&:hover": { bgcolor: "white" } }}
                  >
                    <TableViewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Button
                variant="contained"
                startIcon={<PlusIcon />}
                id="add-property-btn"
                onClick={() => setIsDialogOpen(true)}
              >
                Add Property
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Content Section */}
      {viewMode === "grid" ? (
        <Grid container spacing={3}>
          {filteredProperties.map((property) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={property.id}>
              <Card sx={{ borderRadius: 2, height: "100%", position: "relative" }}>
                <Box
                  sx={{
                    height: 4,
                    width: "100%",
                    bgcolor: (theme) => {
                      const colorName = getStatusColor(property.status);
                      if (colorName === "default") return theme.palette.divider;
                      return theme.palette[colorName].main;
                    },
                  }}
                />
                <CardContent sx={{ p: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: "primary.main", display: "flex" }}>
                      <BuildingIcon fontSize="small" />
                    </Box>
                    <Chip
                      label={property.status}
                      size="small"
                      color={getStatusColor(property.status) as "success" | "warning" | "error" | "default"}
                      variant="outlined"
                      sx={{ fontWeight: 600, textTransform: "capitalize" }}
                    />
                  </Stack>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {property.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1, color: "text.secondary" }}>
                    <MapPinIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {property.address}, {property.city}
                    </Typography>
                  </Stack>

                  <Chip
                    label={property.type}
                    size="small"
                    variant="filled"
                    sx={{ mb: 2.5, height: 20, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}
                  />

                  <Grid container spacing={2} sx={{ mb: 2.5 }}>
                    <Grid size={{ xs: 4 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 600 }}>Units</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{property.units}</Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 600 }}>Occupancy</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{property.occupancyRate}%</Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 600 }}>Revenue</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatCurrency(property.monthlyRevenue)}</Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ width: "100%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={property.occupancyRate}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        "& .MuiLinearProgress-bar": {
                          bgcolor: "success.main",
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
          <Table>
            <TableHead sx={{ bgcolor: alpha(theme.palette.common.black, 0.02) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Property</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Units</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Occupancy</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Revenue</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.08), color: "primary.main", display: "flex" }}>
                        <BuildingIcon sx={{ fontSize: 18 }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{property.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{property.city}, {property.state}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{property.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{property.units}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 80 }}>
                        <LinearProgress variant="determinate" value={property.occupancyRate} sx={{ height: 6, borderRadius: 5 }} />
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{property.occupancyRate}%</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(property.monthlyRevenue)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={property.status}
                      size="small"
                      color={getStatusColor(property.status) as any}
                      sx={{ fontWeight: 600, textTransform: "capitalize" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddPropertyDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={(data) => console.log("New Property Data:", data)}
      />
    </Box>
  );
};

export default PropertiesPage;
