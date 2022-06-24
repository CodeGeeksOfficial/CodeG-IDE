import './App.css';
import Sidebar from 'components/Sidebar';
import CodeSpace from 'components/CodeSpace'
import languages  from 'assets/data/Languages.js'
import Header from 'components/Header';
import { useState } from 'react';

function App() {
  const [currLang, setCurrLang] = useState(languages[0]);
  const [code, setCode] = useState(currLang.BoilerPlate);
  //If an invalid language is mentioned, then a blank screen will appear !

  const handleChangeLang = (name) => {
    if(name!==currLang.name){
      console.log(name);
      let lang;
      for (let i = 0; i < languages.length; i++) {
        let element = languages[i];
        if(name===element.name)
          lang=element;
      }
      setCurrLang(lang);
      setCode(lang.BoilerPlate);
    }
  }

  return (
    <div className="App">
      <Header changeEditorLang={handleChangeLang} languages={languages} currLang={currLang}/>
      <div className="Space">
        <Sidebar/>
        <CodeSpace currLang={currLang} currCode={code} changeEditorCode={setCode}/>
      </div>
    </div>
  );
}

export default App;