import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="side-bar">
        <NavLink to='/dashboard' className="side-bar-option">
          <img className="dash" src={assets.dash} alt="Dashboard" />
          <p className="side-bar-text">Dashboard</p>
        </NavLink>
      </div>
      <div className="side-bar">
        <NavLink to='/product' className="side-bar-option">
          <img className="product" src={assets.product} alt="Product" />
          <p className="side-bar-text">Add Product</p>
        </NavLink>
        </div>
        <div className="side-bar">
        <NavLink to='/list' className="side-bar-option">
          <img className="Aj" src={assets.Aj} alt="Aj" />
          <p className="side-bar-text">Product List</p>
        </NavLink>
      </div>
      <div className="side-bar">
        <NavLink to='/expenses' className="side-bar-option">
          <img className="ex" src={assets.ex} alt="ex" />
          <p className="side-bar-text">Expenses</p>
        </NavLink>
        
      </div>
      <div className="side-bar">
        <NavLink to='/employer' className="side-bar-option">
          <img className="ex" src={assets.Em} alt="ex" />
          <p className="side-bar-text">Employers</p>
        </NavLink>
        
      </div>
    </div>
  );
}

export default Sidebar;
