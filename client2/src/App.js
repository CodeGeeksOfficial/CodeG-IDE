import React from 'react';
import './App.css';
import NavBar from 'Components/NavBar.js';
import CodeSpace from 'Components/CodeSpace.js';
import languages  from 'assets/data/Languages.js'
import { useState } from 'react';

function App() {
  const [CurrLang, setCurrLang] = useState(languages.cpp);
  // const [CurrLang, setCurrLang] = useState(languages.java);
  // const [CurrLang, setCurrLang] = useState(languages.python);
  // const [CurrLang, setCurrLang] = useState(languages.javascript);
  //If an invalid language is mentioned, then a blank white screen will appear !
  const handleChangeLang = (name) => {
      if(name!==CurrLang.name){
        setCurrLang(languages.filter((lang)=>lang.name === name));
      }
  }

  return (
    <div className="App">
      <NavBar />
      <CodeSpace changeLang = {handleChangeLang} currLang={CurrLang}/>
    </div>
  );
}

export default App;
