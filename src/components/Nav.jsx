import React, { useState, useEffect } from "react";

function Nav() {
  const [darkMode, setDarkMode] = useState(true);

  // Theme switch effect
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-transparent">
      <div className="container mx-auto navbar px-6">
        {/* Navbar start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black/50 backdrop-blur-md rounded-box z-[1] mt-3 w-52 p-2 shadow-lg text-white"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Project</a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <a className="p-0">
            <img
              src={
                darkMode
                  ? "https://i.postimg.cc/LsF8N6sn/j-1.png"
                  : "https://i.postimg.cc/Pqn52rqL/j.png"
              }
              alt="Logo"
              className="h-28 w-auto"
            />
          </a>
        </div>

        {/* Navbar center */}
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Project</a>
            </li>
          </ul>
        </div>

        {/* Navbar end */}
        <div className="navbar-end flex items-center gap-4">
          {/* Theme toggle */}
          <label className="grid cursor-pointer place-items-center w-12 h-6 relative">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            />
            {/* Sun Icon */}
            <svg
              className="stroke-white fill-white col-start-1 row-start-1 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            {/* Moon Icon */}
            <svg
              className="stroke-white fill-white col-start-2 row-start-1 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>
          <a className="btn bg-gradient-to-r from-[#FACCD6] to-[#FACCD6] text-black border-none">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
