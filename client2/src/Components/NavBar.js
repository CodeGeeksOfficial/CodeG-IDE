import React from 'react';
import './NavBar.css';

function NavBar(){
  return(
    <div className="header-navbar">
      <div className="logo">
        <img className="logo-img" src="/icons/CodeG-Logo.png" alt="CodeG-Logo" />
        <span className="logo-text">CODEG</span>
      </div>
      <div className="header-middle">
        <form className="file-name-textbox">
          <input className="file-name" type="text" placeholder="Untitled" />
          <button className="file-name-button">Save</button>
        </form>
        <div className="header-icons">
          <img className="icons" src="/icons/new-file-icon.png" alt="new-file-icon" />
          <img className="icons" src="/icons/download-icon.png" alt="download-icon" />
          <img className="icons" src="/icons/copy-icon.png" alt="copy-icon" />
          <img className="icons" src="/icons/keyboard-icon.png" alt="keyboard-icon" />
        </div>
      </div>
      <div className="header-dropdown">
        <select className="dropdown" name="text-size">
           <option value="small">Small</option>
           <option value="medium">Medium</option>
           <option value="large">Large</option>
        </select>
        <select className="dropdown" name="programming-language">
           <option value="small">C++</option>
           <option value="medium">Java</option>
           <option value="large">Python</option>
        </select>
      </div>
      <button className="login-button">
        <img className="login-icon" src="/icons/login-icon.png" alt="login" />
        <span className="login-text">Login</span>
      </button>
    </div>
  )
}

export default NavBar;
