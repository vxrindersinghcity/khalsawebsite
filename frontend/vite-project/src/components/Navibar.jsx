import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">CyberSecurity Portfolio</h1>
        <ul className="flex space-x-4">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;