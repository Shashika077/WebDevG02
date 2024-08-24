import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="side-bar">
        <NavLink to='/bill' className="side-bar-option">
          <img className="product" src={assets.Bill} alt="Product" />
          <p className="side-bar-text">Billing Section</p>
        </NavLink>
      </div>
      <div className="side-bar">
        <NavLink to='/search' className="side-bar-option">
          <img className="dash" src={assets.SI} alt="Dashboard" />
          <p className="side-bar-text">Search Section</p>
        </NavLink>
      </div>
      <div className="side-bar">
        <NavLink to='/sell-r' className="side-bar-option">
          <img className="sell-r" src={assets.SellR} alt="Dashboard" />
          <p className="side-bar-text">Return Section</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
