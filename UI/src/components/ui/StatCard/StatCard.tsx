import React from "react";
import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorScheme?: "primary" | "success" | "warning" | "danger" | "info";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorScheme = "primary",
}) => {
  return (
    <div className={`stat-card stat-card--${colorScheme}`} id={`stat-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="stat-card__header">
        <div className="stat-card__info">
          <span className="stat-card__title">{title}</span>
          <div className="stat-card__value-row">
            <span className="stat-card__value">{value}</span>
            {trend && (
              <span className={`stat-card__trend ${trend.isPositive ? "stat-card__trend--positive" : "stat-card__trend--negative"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && <span className="stat-card__subtitle">{subtitle}</span>}
        </div>
        <div className={`stat-card__icon stat-card__icon--${colorScheme}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
