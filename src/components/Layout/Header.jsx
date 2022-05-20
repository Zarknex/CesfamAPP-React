import React from "react";
import logo from "../../cesfamlogo.png";

function Header() {
  return (
      <nav className="bg-white shadow-sm">
        <div className="container-fluid">
          <div className="flex justify-center">
            <a className="navbar-brand px-3" href="/">
              <img src = {logo} alt="logo" height= {80} width={80}/>
              
            </a>
          </div>
        </div>
      </nav>
  );
}

export default Header;