import "./App.css";
import React, { useState } from "react";
import axios from 'axios';


function App() {

  const cppStarterCode = `#include <iostream>
  using namespace std;
  int main() {
      cout<<"Hey Codies !";
  }`;

  const javaStarterCode = `public class Main {
    public static void main(String args[]) {
        System.out.println("Hey Codies !");
    }
  }`;

  const pythonStarterCode = `print('Hey Codies !')`;

  const [code, setCode] = useState(cppStarterCode);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [jobStatus, setJobStatus] = useState('Pending');

  const changeCode = (language) =>{
    if(language === "cpp"){
      setCode(cppStarterCode)
    } else if(language==="java"){
      setCode(javaStarterCode)
    } else if(language==="py"){
      setCode(pythonStarterCode)
    }
  }
  
  const handleSubmit = async () => {

    const apiReqData = {
      api_key:"some_random_key",
      language: language,
      code
    }

    try{
    const {data} = await axios.post("http://localhost:3002/run", apiReqData)
    setOutput(`Running your Code...
    Status: ${jobStatus}`);

    let intervalId;

    intervalId = setInterval(async()=>{
      const {data: dataRes} = await axios.get("http://localhost:3002/status", {params: {id: data.jobId}});
      
      const{success, job, error} = dataRes;
      if(success){
        const {status: jobStatus, output: jobOutput} = job;
        if(jobStatus === "pending"){
          return;
        }
        
        setJobStatus("Success")
        setOutput(`${jobOutput}
        Status: ${jobStatus}`);
        clearInterval(intervalId);

      } else {
        console.error(error);
        clearInterval(intervalId);
        setOutput(error);
      }
    
    }, 1000)
  }

    catch(err){
      const err_output_str = err.response.data.err.stderr;
      setOutput(err_output_str.slice(err_output_str.indexOf("error")));
    }
  };

  return (
    <div className="App">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            CodeG
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div>
        <div className="form-group languageContainer">
          <label className="m-3">Language</label>
          <select
            value={language}
            onChange={(e)=>{setLanguage(e.target.value); changeCode(e.target.value);}}
            className="form-control m-3"
            name="language"
            id="exampleFormControlSelect1"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
          </select>

          <button className="btn btn-dark m-3" onClick={handleSubmit}>
            Run
          </button>
        </div>

        <div className="form-group m-3">
          <label>Code</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="15"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea>
        </div>
      </div>

      <div>
        <p className="font-weight-bold m-3">{output}</p>
      </div>
    </div>
  );
}

export default App;
