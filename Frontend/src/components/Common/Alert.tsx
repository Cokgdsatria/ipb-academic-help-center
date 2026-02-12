// ============================================================
// 🚨 ALERT - Alert Message Component
// ============================================================

import React, { useState, useEffect } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  autoCloseDuration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, onClose]);

  if (!isVisible) return null;

  const alertConfig = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "✓",
      color: "text-green-700",
      iconBg: "bg-green-100",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "✕",
      color: "text-red-700",
      iconBg: "bg-red-100",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "⚠",
      color: "text-yellow-700",
      iconBg: "bg-yellow-100",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "ℹ",
      color: "text-blue-700",
      iconBg: "bg-blue-100",
    },
  };

  const config = alertConfig[type];

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-lg p-4 flex gap-3 items-start`}
    >
      <div
        className={`${config.iconBg} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${config.color}`}
      >
        {config.icon}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${config.color}`}>{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className={`text-${type === "success" ? "green" : type === "error" ? "red" : type === "warning" ? "yellow" : "blue"}-700 hover:opacity-70`}
      >
        ✕
      </button>
    </div>
  );
};

export default Alert;
