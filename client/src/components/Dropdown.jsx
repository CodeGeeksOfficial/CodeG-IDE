import React from 'react'
import { useState } from 'react';
import 'assets/css/Dropdown.css'
import {AiFillCaretDown} from 'react-icons/ai'
import {useEditorStore, languages} from 'store/EditorStore'
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// let js = 10;
let js = <div>Hello</div>;
export default function Dropdown() {
    const curLang = useEditorStore(store=> store.curLang)
    const setState = useEditorStore(store => store.setState)

    const [isActive, setisActive] = useState(false);
    const handleClickAway = () => {
        setisActive(false);
    }
    const handleDropdownClick = () => {
        if(isActive)
            setisActive(false);
        else
            setisActive(true);
    }
  return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
                <div className="dropdown">
                    <div className="dropdown-btn" onClick={handleDropdownClick}>
                    <span>{languages[curLang].display_name}</span>
                    <AiFillCaretDown
                        size={13}
                    />
                    </div>
                    <div className="dropdown-list">
                    {isActive && languages.map((lang, idx) => {
                    return (
                        <div className="dropdown-item" key={lang.display_name} onClick={()=>{handleDropdownClick(); setState('curLang', idx)}}>
                            {lang.display_name}
                        </div>
                        )
                    })}
                    </div>
                </div>
            </Box>
        </ClickAwayListener>
  )
}
