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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Add as PlusIcon,
  Search as SearchIcon,
  Warning as AlertTriangleIcon,
  Schedule as ClockIcon,
  CheckCircle as CheckCircleIcon,
  Business as BuildingIcon,
} from "@mui/icons-material";
import { mockMaintenanceRequests } from "../../../data/mockData";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card sx={{ height: "100%", borderRadius: 3 }}>
    <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color: color, mr: 2.5, display: "flex" }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, display: "block" }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>{value}</Typography>
      </Box>
    </CardContent>
  </Card>
);

const MaintenancePage: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredRequests = mockMaintenanceRequests.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || m.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const openCount = mockMaintenanceRequests.filter((m) => m.status === "open").length;
  const inProgressCount = mockMaintenanceRequests.filter((m) => m.status === "in-progress").length;
  const resolvedCount = mockMaintenanceRequests.filter(
    (m) => m.status === "resolved" || m.status === "closed"
  ).length;
  const urgentCount = mockMaintenanceRequests.filter(
    (m) => m.priority === "urgent" || m.priority === "high"
  ).length;

  const getPriorityColor = (priority: string): "error" | "warning" | "info" | "default" => {
    switch (priority.toLowerCase()) {
      case "urgent":
      case "high": return "error";
      case "medium": return "warning";
      case "low": return "info";
      default: return "default";
    }
  };

  const getStatusColor = (status: string): "warning" | "info" | "success" | "default" => {
    switch (status.toLowerCase()) {
      case "open": return "warning";
      case "in-progress": return "info";
      case "resolved":
      case "closed": return "success";
      default: return "default";
    }
  };

  return (
    <Box id="maintenance-page">
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Open Requests"
            value={openCount}
            icon={<AlertTriangleIcon />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="In Progress"
            value={inProgressCount}
            icon={<ClockIcon />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Resolved"
            value={resolvedCount}
            icon={<CheckCircleIcon />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="High Priority"
            value={urgentCount}
            icon={<AlertTriangleIcon />}
            color={theme.palette.error.main}
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
                placeholder="Search requests..."
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
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </TextField>
              <TextField
                select
                size="small"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                sx={{ width: 140 }}
                label="Priority"
              >
                <MenuItem value="all">All Priority</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </TextField>
            </Stack>

            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              id="add-maintenance-btn"
            >
              New Request
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: theme.shadows[1] }}>
        <Table>
          <TableHead sx={{ bgcolor: alpha(theme.palette.common.black, 0.02) }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>Request</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Property / Tenant</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Date Created</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 8,
                        height: 40,
                        borderRadius: 4,
                        bgcolor: theme.palette[getPriorityColor(request.priority) as "error" | "warning" | "info"].main,
                        mt: 0.5,
                      }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{request.title}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: "block", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {request.description}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
                      <BuildingIcon sx={{ fontSize: 14, mr: 0.5, opacity: 0.6 }} />
                      {request.propertyName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {request.tenantName}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.priority}
                    size="small"
                    color={getPriorityColor(request.priority)}
                    sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: 10, height: 22 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.status}
                    size="small"
                    color={getStatusColor(request.status)}
                    variant="outlined"
                    sx={{ fontWeight: 800, textTransform: "capitalize", height: 24 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {new Date(request.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {new Date(request.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MaintenancePage;
