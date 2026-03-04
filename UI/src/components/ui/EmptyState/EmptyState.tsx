import React from "react";
import "./EmptyState.css";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state__icon">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && (
        <button
          className="empty-state__action"
          onClick={action.onClick}
          id={`empty-state-action-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
