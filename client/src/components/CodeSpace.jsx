import { React, useState ,useRef, useMemo } from 'react';
import 'assets/css/CodeSpace.css';
import InputSpace from './InputSpace';
import OutputSpace from './OutputSpace'
import Editor from "@monaco-editor/react";
import {AiFillPlayCircle} from 'react-icons/ai';
import {useEditorStore,languages} from 'store/EditorStore'
import axios from 'axios';
import Dropdown from 'components/Dropdown'

// jsx ka variable 
const jsx = <div className="opened-files">Hello baby </div>;
function CodeSpace(){
  const [isLoading, setIsLoading] = useState(false);
  // console.log(isLoading)
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

  // function abortProtocol(intervalId,time){
  //   console.log("Inside abortProtocol")
  //   console.log("isLoading: " , isLoading)

  //   setTimeout(()=>{
  //     if(isLoading===true){
  //       console.log("Request timeout")
  //       clearInterval(intervalId)
  //       setState('output',"Request timeout")
  //       setIsLoading(false)
  //     }else
  //       console.log("isLoading: " , isLoading)
  //   },time)
  // }

  const handleRun = async () => {
    let lang = selectedLang
    const apiReqData = {
      language: lang.ext,
      code:getValue(),
      input:useEditorStore.getState().input
    }
    // console.log("Submitted this code in " + lang.name + " : ");
    // console.log(getValue());
    // console.log("input", useEditorStore.getState().input)
    setState('code', getValue())
    try {
      setIsLoading(true);
      const {data : resultId} = await axios.post("http://localhost:6500/run", apiReqData)
      
      // console.log(typeof resultId);
      // console.log(resultId);

      let intervalId = setInterval(async () => {
        let {data: dataRes} = await axios.get("http://localhost:6500/results/" + resultId)
        let {status , jobOutput} = dataRes
        // console.log(intervalId)
        console.log(dataRes)
        // abortProtocol(intervalId,5000);
        // console.log(isLoading)
        if(status === "Done"){
          clearInterval(intervalId)
          // console.log(jobOutput.stdout)
          setIsLoading(false)
          if(jobOutput.stderr!=="")
            setState('output',jobOutput.stderr)
          else
            setState('output',jobOutput.stdout)
        }else{
          console.log("Current status: " + status)
        }
      }, 1000)
      // abortProtocol(intervalId,2000);
    } catch (error) {
      setIsLoading(false)
      setState('output',"Server not responding!")
      console.err(error)
    }
  }

  return(
    <div className="code-space">
      <div className="code-editor">
        <div className="file-options">
          <Dropdown onRequestClose={()=>console.log("Clicked outside dropdown")}/>
        </div>
        <Editor
          height="95%"
          width="100%"
          theme='vs-dark'
          loading="<Loading/>"
          language={selectedLang.editor_lang}
          value={selectedLang.BoilerPlate}
          onMount={handleEditorDidMount}
        />
        <div className="play-button-icon">
        <AiFillPlayCircle 
          size={90}
          onClick={()=>!isLoading && handleRun()}   //Multiple submission won't be made if already compiling
          title='Run'
        />
        </div>
      </div>
      <div className="print-area">
        <InputSpace/>
        <OutputSpace isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default CodeSpace;