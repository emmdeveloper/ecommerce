import React from "react";

const Navbar = () => {
  return (
    <header className="header bg-base-100">
      <nav className="wrapper flex justify-between items-center">
        <div>NavLogo</div>
        <div className="relative ml-auto">
          <button>Cart</button>
        </div>
        <div>
          <button className="p-2">Sign-In</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
