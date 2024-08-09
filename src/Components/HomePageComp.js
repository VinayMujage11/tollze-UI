//import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import logo from 'C:/Users/vinay/OneDrive/Desktop/Tollz-E-UI/tollze/src/images/file1.png';
import React, { useState } from 'react';

const HomePageComp = () => {
  
    return (
      <div className="App">
        <header className="header" >
          <img src={logo} alt="Logo" className="logo" />
          <nav className="nav">
            <Link to="/">Home</Link>
          </nav>
        </header>

        <main className="main-content">
          <Outlet/>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Tollz-E . All rights reserved.</p>
        </footer>
      </div>


    )
}

export default HomePageComp;