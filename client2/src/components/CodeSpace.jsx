import { React, useState ,useRef, useMemo } from 'react';
import 'assets/css/CodeSpace.css';
import InputSpace from './InputSpace';
import OutputSpace from './OutputSpace'
import Editor from "@monaco-editor/react";
import {AiFillPlayCircle} from 'react-icons/ai';
import {useEditorStore,languages} from 'store/EditorStore'

function CodeSpace(){
  const [isLoading, setIsLoading] = useState(false);
  const curLang = useEditorStore(store => store.curLang);
  //If an invalid language is mentioned, then a blank screen will appear !
  const setState = useEditorStore(store => store.setState);

  const selectedLang = useMemo(()=>{
    return languages[curLang]
  }, [curLang])

  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

  function getValue(){
    return editorRef.current.getValue();
  }

  // This is a dummyCall to server
  async function dummyCall(isWorking) {
    return new Promise((resolve, reject) => {
      isWorking ? setTimeout(()=>resolve("Success"),2000) : setTimeout(()=>reject("Reject"),2000);
    })
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
      setState('output',"Beta koi dikkat hai server mein ...")
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
          loading="<Loading/>"
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