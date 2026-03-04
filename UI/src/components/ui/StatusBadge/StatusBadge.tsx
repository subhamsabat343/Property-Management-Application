import React from "react";
import "./StatusBadge.css";

interface StatusBadgeProps {
  status: string;
  variant?: "filled" | "outlined" | "soft";
}

const STATUS_COLORS: Record<string, string> = {
  active: "success",
  open: "warning",
  "in-progress": "info",
  resolved: "success",
  closed: "default",
  pending: "warning",
  expired: "danger",
  maintenance: "warning",
  vacant: "danger",
  low: "success",
  medium: "warning",
  high: "danger",
  urgent: "danger",
  residential: "primary",
  commercial: "info",
  mixed: "warning",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = "soft",
}) => {
  const color = STATUS_COLORS[status] || "default";

  return (
    <span className={`status-badge status-badge--${color} status-badge--${variant}`}>
      <span className="status-badge__dot" />
      {status.replace(/-/g, " ")}
    </span>
  );
};

export default StatusBadge;
