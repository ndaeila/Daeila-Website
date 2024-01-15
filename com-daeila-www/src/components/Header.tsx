import React, { ReactNode } from 'react';
import NavBar from './Header/NavBar';


const Header = () => {
    return (
      <header>
        <NavBar />
        <div className="pt-16 bg-silver-rust-50">{/*Adjust padding top value to match the NavBar's height*/}</div>
      </header>
    );
  };

export default Header;