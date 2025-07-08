import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu,FiMessageCircle, FiHome, FiBell, FiSettings, FiLogOut } from "react-icons/fi";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y:auto positon:fixed">
        <Outlet />
      </div>
    </div>
  );
}

