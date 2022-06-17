import './CodeSpace.css';
import Space from './Space.js';
import Editor from "@monaco-editor/react";

function CodeSpace(){
  const lang = {
    BoilerPlate:"console.log('hello world!');"
  }
  return(
    <div className="code-space">
      <div className="code-editor">

        <Editor
          value={lang.BoilerPlate}
          height="100%"
          width="100%"
          language="cpp"
          // loading=""
          theme='vs-dark'
        />
        
        <img className="play-button-icon" src="/icons/play-button-icon.png" alt="play-button" />
      </div>
      <div className="print-area">
        <Space heading="Enter Input" flag="true" />
        <Space heading="Output" />
      </div>
    </div>
  )
}

export default CodeSpace;