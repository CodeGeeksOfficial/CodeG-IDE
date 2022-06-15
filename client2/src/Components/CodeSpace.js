import React from 'react';
import './CodeSpace.css';
import Space from './Space.js';

function CodeSpace(){
  return(
    <div className="codeSpace">
      <div className="code-area">
        <textarea className="code" placeholder="Write your code here" >
        </textarea>
        <img className="play-button-icon" src="/icons/play-button-icon.png" alt="play-button" />
      </div>
      <div className="print-area">
        <Space heading="Enter Input" />
        <Space heading="Output" />
      </div>
    </div>
  )
}

export default CodeSpace;
