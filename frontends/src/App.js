import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Receipt from './components/Receipt';
import MainLayout from "./components/MainLayout";
import ChatBox from "./components/ChatBox";
import './App.css'; // ✅ Add this line

function AppRoutes() {
  const [selectedDevices, setSelectedDevices] = useState({});
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/home"
          element={
            <Home
              selectedDevices={selectedDevices}
              onConfirm={(devices) => {
                setSelectedDevices(devices);
                navigate("/receipt"); // ✅ confirm နဲ့ receipt ကိုပြန်တက်မယ်
              }}
            />
          }
        />
        <Route
          path="/receipt"
          element={
            <Receipt
              selectedDevices={selectedDevices}
              onBack={() => navigate("/home")} // ✅ back နဲ့ home ပြန်တက်မယ်
            />
          }
        />
        <Route path="/chat" element={<ChatBox />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
