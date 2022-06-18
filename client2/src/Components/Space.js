import './Space.css';

export default function Space(props){
  if(props.flag === "true"){
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
      {/*TODO <div className="space-output"></div> */}
      </div>
    )
    }
}
