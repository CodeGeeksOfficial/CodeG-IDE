// POST and GET requests are made from this component
import { React, useState ,useRef, useMemo } from 'react';
import 'assets/css/CodeSpace.css';
import InputSpace from './InputSpace';
import OutputSpace from './OutputSpace'
import Editor from "@monaco-editor/react";
import {AiFillPlayCircle} from 'react-icons/ai';
import {useEditorStore,languages} from 'store/EditorStore'

async function dummyCall(isWorking) {
  return new Promise((resolve, reject) => {
    isWorking ? setTimeout(()=>resolve("Success"),2000) : setTimeout(()=>reject("Reject"),2000);
  })
}

function CodeSpace(props){
  const [isLoading, setIsLoading] = useState(false);
  const curLang = useEditorStore(store => store.curLang);
  const setState = useEditorStore(store => store.setState);

  const selectedLang = useMemo(()=>{
    return languages[curLang]
  }, [curLang])

  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }
  // console.log("lol")
  function getValue(){
    return editorRef.current.getValue();
  }

  const handleRun = async () => {
    let lang = selectedLang
    console.log("Submitted this code in " + lang.name + " : ");
    console.log(getValue());
    console.log("input", useEditorStore.getState().input)
    setState('code', getValue())
    try {
      setIsLoading(true);
      let outputStr = await dummyCall(true);
      setState('output', outputStr)
    } catch (error) {
      setState('output',"Beta koi dikkat hai ")
    } finally{
      console.log("Request to dummy server was made")
      setIsLoading(false);
    }
  }

  return(
    <div className="code-space">
      <div className="code-editor">
        <Editor
          height="100%"
          width="100%"
          theme='vs-dark'
          defaultLanguage={selectedLang.name}
          defaultValue={selectedLang.BoilerPlate}
          language={selectedLang.name}
          value={selectedLang.BoilerPlate}
          onMount={handleEditorDidMount}
        />
        <div className="play-button-icon" title='Run' onClick={()=>handleRun()}>
        <AiFillPlayCircle 
          size={90}
        />
        </div>
      </div>
      <div className="print-area">
        <InputSpace heading="Input"/>
        <OutputSpace heading="Output" isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default CodeSpace;