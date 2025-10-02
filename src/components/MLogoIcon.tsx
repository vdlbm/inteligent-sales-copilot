import * as React from "react";

interface MLogoIconProps {
  className?: string;
}

export const MLogoIcon = ({ className = "" }: MLogoIconProps) => {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="M logo"
    >
      <title>M logo</title>
      {/* Left vertical bar with stripes */}
      <rect x="15" y="25" width="8" height="12" fill="currentColor" />
      <rect x="15" y="40" width="8" height="12" fill="currentColor" />
      <rect x="15" y="55" width="8" height="12" fill="currentColor" />
      <rect x="15" y="70" width="8" height="5" fill="currentColor" />
      
      {/* Left diagonal with stripes */}
      <rect x="30" y="30" width="8" height="10" fill="currentColor" />
      <rect x="38" y="38" width="8" height="10" fill="currentColor" />
      <rect x="46" y="46" width="8" height="10" fill="currentColor" />
      
      {/* Center peak with stripes */}
      <rect x="54" y="25" width="8" height="12" fill="currentColor" />
      <rect x="54" y="40" width="8" height="8" fill="currentColor" />
      
      {/* Right diagonal with stripes */}
      <rect x="62" y="46" width="8" height="10" fill="currentColor" />
      <rect x="70" y="38" width="8" height="10" fill="currentColor" />
      <rect x="78" y="30" width="8" height="10" fill="currentColor" />
      
      {/* Right vertical bar with stripes */}
      <rect x="86" y="25" width="8" height="12" fill="currentColor" />
      <rect x="86" y="40" width="8" height="12" fill="currentColor" />
      <rect x="86" y="55" width="8" height="12" fill="currentColor" />
      <rect x="86" y="70" width="8" height="5" fill="currentColor" />
    </svg>
  );
};
