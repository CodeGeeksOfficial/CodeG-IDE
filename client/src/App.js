import './App.css';
import Sidebar from 'components/Sidebar';
import CodeSpace from 'components/CodeSpace'
import Header from 'components/Header';

function App() {
  
  return (
    <div className="App">
      <div className="Space">
        <Sidebar/>
        <CodeSpace/>
      </div>
      <Header/>
    </div>
  );
}

export default App;