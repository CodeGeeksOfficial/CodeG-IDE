import './CodeSpace.css';
import Space from './Space.js';
import Editor from "@monaco-editor/react";
import {AiFillPlayCircle} from 'react-icons/ai';
// import { useEffect, useState } from 'react';
import { useState } from 'react';
// import axios from 'axios';

export default function CodeSpace(props){

  const [code, setCode] = useState(props.currLang.BoilerPlate)
  // const [jobStatus, setJobStatus] = useState('Pending');
  // const [output, setOutput] = useState('Hello my friend ');

  const observeChange = (code,event) => {
    // console.log(event);
    setCode(code);
  }

  // useEffect((message) => {
  //     console.log("useEffect() called for change in 'output' : ");
  //     console.log(output);
  // }, [output])
  
  const handleRun = (code,lang) => {
    console.log("Submitted this code in " + lang + " : ");
    console.log(code);
  }

  // const handleRun = async (code,lang) => {

  //   const apiReqData = {
  //     api_key:"some_random_key",
  //     language: lang,
  //     code:code
  //   }

  //   try{
  //   const {data} = await axios.post("http://localhost:3002/run", apiReqData)
  //   setOutput(`Running your Code...
  //   Status: ${jobStatus}`);

  //   let intervalId;

  //   intervalId = setInterval(async()=>{
  //     const {data: dataRes} = await axios.get("http://localhost:3002/status", {params: {id: data.jobId}});
      
  //     const{success, job, error} = dataRes;
  //     if(success){
  //       const {status: jobStatus, output: jobOutput} = job;
  //       if(jobStatus === "pending"){
  //         return;
  //       }
        
  //       setJobStatus("Success")
  //       setOutput(`${jobOutput}
  //       Status: ${jobStatus}`);
  //       clearInterval(intervalId);

  //     } else {
  //       console.error(error);
  //       clearInterval(intervalId);
  //       setOutput(error);
  //     }
    
  //   }, 1000)
  // }

  //   catch(err){
  //     const err_output_str = err.response.data.err.stderr;
  //     setOutput(err_output_str.slice(err_output_str.indexOf("error")));
  //   }
  // };

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
        <Space heading="Enter Input" flag="true" />
        <Space heading="Output" flag="false"/>
      </div>
    </div>
  )
}
