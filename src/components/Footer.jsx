import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FACCD6] to-[#f8a1b3] text-gray-800">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/Pqn52rqL/j.png"
              alt="Logo"
              className="h-16 w-auto"
            />
            <h2 className="text-2xl font-bold">My Portfolio</h2>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center gap-6 text-lg font-medium">
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
            <li><a href="#skills" className="hover:text-white transition">Skills</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
    
          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm">
          <p>
            © {new Date().getFullYear()} Mizanur Rahman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
