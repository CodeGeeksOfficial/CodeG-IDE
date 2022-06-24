import React from 'react'
import { useState } from 'react';
import 'assets/css/Dropdown.css'
import {AiFillCaretDown} from 'react-icons/ai'

// const icons = [
//     {
//         name:"logo",
//         importedIconModule:"--fucntion--",
//     },
//     {
//         name:"download",
//         importedIconModule:"--fucntion--",
//     }
// ]

export default function Dropdown(props) {
    const [isActive, setisActive] = useState(false);
    const handleDropdownClick = () => {
        if(isActive)
            setisActive(false);
        else
            setisActive(true);
    }
  return (
    <div className="dropdown">
        <div className="dropdown-btn" onClick={handleDropdownClick}>
            <span>{props.currLang.name}</span>
            <AiFillCaretDown
                size={13}
            />
        </div>
        <div className="dropdown-list">
        {isActive && props.languages.map(lang => {
        return (
            <div className="dropdown-item" key={lang.name} onClick={()=>{handleDropdownClick();props.changeEditorLang(lang.name)}}>
                {lang.name}
            </div>
            )
        })}
        </div>
    </div>
  )
}
