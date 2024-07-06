import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../../src/index.css' // Assuming you create a Home.css file for styles

export default function Explore() {
  return (
    <div className="page-container">
      <Sidebar className="sidebar" />
      <div className="main-content">
        <h1 className="main-heading">Explore</h1>
      </div>
    </div>
  );
}
