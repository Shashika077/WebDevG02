import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LogingSingup from './Pages/LogingSingup/LogingSingup.jsx';
import Home from './Pages/Home/Home.jsx';
import Navbar from './Component/Navbar/Navbar.jsx';
import Sidebar from './Component/Sidebar/Sidebar.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Product from './Pages/Product/Product.jsx';
import List from './Pages/List/List.jsx';
import ExpenseForm from './Pages/Expenss/Expenss.jsx';
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
            <Route path="/employer" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/list" element={<List/>} />
            <Route path="/expenses" element={<ExpenseForm/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
