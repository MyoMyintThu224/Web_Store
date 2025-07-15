/*import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu,FiMessageCircle, FiHome, FiBell, FiSettings, FiLogOut } from "react-icons/fi";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      // Sidebar
      <div className={`bg-gray-800 text-white p-4 ${open ? "w-48" : "w-14"} duration-300`}>
        <button onClick={() => setOpen(!open)}><FiMenu size={30} /></button>
        {open && (
        <ul className="mt-4 space-y-2">
          <li><Link to="/home"><FiHome className="inline mr-1" size="30" /> Home</Link></li>
          <li><Link to="/chat"><FiMessageCircle className="inline mr-1" size="30" /> Chat</Link></li>
          <li><Link to="/notifications"><FiBell className="inline mr-1" size="30" /> Notifications</Link></li>
          <li><Link to="/settings"><FiSettings className="inline mr-1" size="30" /> Settings</Link></li>
          <li><Link to="/"><FiLogOut className="inline mr-1" size="30" /> Logout</Link></li>
        </ul>
        )}
      </div>

      // Main Content
      <div className="flex-1 p-4 overflow-y:auto relative">
        <Outlet />
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu, FiMessageCircle, FiHome, FiBell, FiSettings, FiLogOut } from "react-icons/fi";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      //Sidebar
      <div
        className={`bg-gray-800 text-white p-4 fixed top-0 h-full ${
          open ? "w-48" : "w-14"
        }md:w-48 duration-300 z-50`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1100,
          overflowY: 'auto',
        }}
      >
        <button onClick={() => setOpen(!open)}><FiMenu size={25} /></button>
        {open && (
          <ul className="mt-4 space-y-2">
            <li><Link to="/home"><FiHome className="inline mr-1" size="30" /> Home</Link></li>
            <li><Link to="/chat"><FiMessageCircle className="inline mr-1" size="25" /> Chat</Link></li>
            <li><Link to="/notifications"><FiBell className="inline mr-1" size="25" /> Notifications</Link></li>
            <li><Link to="/settings"><FiSettings className="inline mr-1" size="25" /> Settings</Link></li>
            <li><Link to="/"><FiLogOut className="inline mr-1" size="25" /> Logout</Link></li>
          </ul>
        )}
      </div>

      //Main Content
      <div className={`flex-1 p-4 ml-${open ? "48" : "14"} transition-all duration-300`}>
        <Outlet />
      </div>

    </div>
  );
}*/
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FiMenu, FiMessageCircle, FiHome,
  FiBell, FiSettings, FiLogOut
} from "react-icons/fi";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="bg-gray-800 text-white w-full p-3 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => setOpen(!open)}>
            <FiMenu size={24} />
          </button>
          <span className="text-lg font-semibold">Web Store</span>
        </div>

        {/* Navigation Links */}
        {open && (
          <ul className="flex flex-wrap gap-6 text-sm md:text-base">
            <li>
              <Link to="/home" className="hover:underline flex items-center gap-1">
                <FiHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:underline flex items-center gap-1">
                <FiMessageCircle /> Chat
              </Link>
            </li>
            <li>
              <Link to="/notifications" className="hover:underline flex items-center gap-1">
                <FiBell /> Notifications
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:underline flex items-center gap-1">
                <FiSettings /> Settings
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline flex items-center gap-1">
                <FiLogOut /> Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}


