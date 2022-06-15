import React from 'react';
import './Space.css';

function Space(props){
  return(
    <div className="space">
      <span className="heading">{props.heading}</span>
    </div>
  )
}

export default Space;
