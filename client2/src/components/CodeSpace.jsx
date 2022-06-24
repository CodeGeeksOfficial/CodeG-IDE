import 'assets/css/CodeSpace.css';
import IOspace from './IOspace';
import Editor from "@monaco-editor/react";
import {AiFillPlayCircle} from 'react-icons/ai';

function CodeSpace(props){
  const code = props.currCode;
  // const [code, setCode] = useState(props.currLang.BoilerPlate);
  const changeCode = props.changeEditorCode;
   
  const observeChange = (code,event) => {
    // console.log(event);
    changeCode(code);
  }
  
  const handleRun = (code,lang) => {
    console.log("Submitted this code in " + lang + " : ");
    console.log(code);
  }

  return(
    <div className="code-space">
      <div className="code-editor">
        <Editor
          value={code}
          height="100%"
          width="100%"
          language={props.currLang.name}
          theme='vs-dark'
          onChange={(code,event)=> observeChange(code,event)}   //Important : Observe the pramameters and 'event' object
        />
        <div className="play-button-icon" title='Run' onClick={()=>handleRun(code,props.currLang.name)}>
        <AiFillPlayCircle 
          size={90}
        />
        </div>
      </div>
      <div className="print-area">
        <IOspace heading="Input" flag="true" />
        <IOspace heading="Output" flag="false"/>
      </div>
    </div>
  )
}

export default CodeSpace;