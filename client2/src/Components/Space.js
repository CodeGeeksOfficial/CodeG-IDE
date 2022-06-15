import React from 'react';
import './Space.css';

function Space(props){
  // return(
  //   <div className="space">
  //     <span className="heading">{props.heading}</span>
  //   </div>
    
  // )
  if(props.flag == "true"){
    return(
      <div className="space">
    <span className="heading">{props.heading}</span>
    <textarea className="space-input"></textarea>
    </div>
    )
  }else{
    return(
      <div className="space">
    <span className="heading">{props.heading}</span>
    </div>
    )
    }
}

export default Space;
