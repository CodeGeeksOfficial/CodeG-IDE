import React from 'react'
import 'assets/css/Header.css'
import Dropdown from 'components/Dropdown'
export default function Header() {
  return (
    <div className="header-container">
      <div className="header-sub-container">
        <div className="codeg-logo"><img src="assets/icons/CodeG-Logo.png" alt="CodeG Logo" /></div>
        <span className="logo-text">CODE<span>G</span></span>
        <div className="header-content">
          {/* <span className="logo-text">CODE<span>G</span></span> */}
          {/* <Dropdown onRequestClose={()=>console.log("Clicked outside dropdown")}/> */}
          <div className="user-info">
            {/* <div className="sign-in">
              Sign In
            </div> */}
            <div className="sign-up">
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
