import * as React from "react";

interface MLogoIconProps {
  className?: string;
  variant?: "light" | "dark";
}

export const MLogoIcon = ({ className = "", variant = "light" }: MLogoIconProps) => {
  const strokeColor = variant === "light" ? "currentColor" : "currentColor";
  
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="M logo"
    >
      <title>M logo</title>
      {/* Left vertical stroke with horizontal stripes */}
      <rect x="10" y="20" width="4" height="12" fill={strokeColor} />
      <rect x="10" y="36" width="4" height="12" fill={strokeColor} />
      <rect x="10" y="52" width="4" height="12" fill={strokeColor} />
      <rect x="10" y="68" width="4" height="12" fill={strokeColor} />
      
      {/* Left diagonal stroke with horizontal stripes */}
      <rect x="20" y="28" width="4" height="10" fill={strokeColor} transform="rotate(35 22 33)" />
      <rect x="26" y="38" width="4" height="10" fill={strokeColor} transform="rotate(35 28 43)" />
      <rect x="32" y="48" width="4" height="10" fill={strokeColor} transform="rotate(35 34 53)" />
      
      {/* Center peak */}
      <rect x="46" y="20" width="4" height="12" fill={strokeColor} />
      <rect x="46" y="36" width="4" height="12" fill={strokeColor} />
      
      {/* Right diagonal stroke with horizontal stripes */}
      <rect x="60" y="28" width="4" height="10" fill={strokeColor} transform="rotate(-35 62 33)" />
      <rect x="66" y="38" width="4" height="10" fill={strokeColor} transform="rotate(-35 68 43)" />
      <rect x="72" y="48" width="4" height="10" fill={strokeColor} transform="rotate(-35 74 53)" />
      
      {/* Right vertical stroke with horizontal stripes */}
      <rect x="82" y="20" width="4" height="12" fill={strokeColor} />
      <rect x="82" y="36" width="4" height="12" fill={strokeColor} />
      <rect x="82" y="52" width="4" height="12" fill={strokeColor} />
      <rect x="82" y="68" width="4" height="12" fill={strokeColor} />
    </svg>
  );
};
