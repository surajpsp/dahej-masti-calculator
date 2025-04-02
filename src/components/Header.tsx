
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center p-4">
      <div className="relative inline-block">
        <h1 className="text-4xl font-bold text-dahej-red animate-celebrate">
          दहेज कैलकुलेटर
        </h1>
        <span className="absolute -top-3 -right-3 text-xl rotate-12 text-dahej-orange">
          🎉
        </span>
      </div>
      <p className="text-dahej-blue mt-2 text-sm">
        अपना दहेज स्कोर जानिए और दोस्तों को शेयर करें!
      </p>
    </header>
  );
};

export default Header;
