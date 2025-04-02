
import React from "react";

interface AdPlaceholderProps {
  position: "top" | "bottom";
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ position }) => {
  return (
    <div className="ad-placeholder w-full">
      विज्ञापन स्थान - {position === "top" ? "ऊपर" : "नीचे"}
    </div>
  );
};

export default AdPlaceholder;
