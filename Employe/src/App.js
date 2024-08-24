import React from 'react'
import Navbar from './Component/Navbar/Navbar.jsx'
import LogingSingup from './Pages/LogingSingup/LogingSingup.jsx';
import Sidebar from './Component/Sidebar/Sidebar.jsx';
import Check from './Pages/Check/Check.jsx';
import Bill from './Pages/Bill/Bill.jsx';
import SellRForm from './Pages/SellsR/SellsR.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'; 
const App = () => {
  const location = useLocation();

  // Function to determine if Navbar should be displayed
  const shouldDisplayNavbar = () => {
    return location.pathname !== '/' && !location.pathname.startsWith('/signup');
  };

  // Function to determine if Sidebar should be displayed
  const shouldDisplaySidebar = () => {
    return !['/', '/record'].includes(location.pathname); // Adjust paths as needed
  };

  return (
    <div className="container">
      {shouldDisplayNavbar() && <Navbar />}
      <div className="content-wrapper">
        {shouldDisplaySidebar() && <Sidebar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LogingSingup />} />
            <Route path="/search" element={<Check />} />
            <Route path="/bill" element={<Bill/>} />
            <Route path="/sell-r" element={<SellRForm/>} />

          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;

