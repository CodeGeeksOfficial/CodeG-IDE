import 'assets/css/IOspace.css';

export default function Space(props){
  if(props.flag === "true"){
    return(
      <div className="space">
      <span className="heading">{props.heading}</span>
      <textarea className="space-input" placeholder="Enter input"></textarea>
      </div>
    )
  }else{
    return(
      <div className="space">
      <span className="heading">{props.heading}</span>
      <div className="space-output"></div>
      </div>
    )
    }
}
