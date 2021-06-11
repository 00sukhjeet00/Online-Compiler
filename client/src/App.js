import "./App.css";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from 'axios'
function App() {
  const cpp='#include<iostream>\nusing namespace std;\nint main()\n{\ncout<<"Hello World";\n}\n'
  const python='print("Hello World")'
  const [code, setcode] = useState(cpp)
  const [lang, setlang] = useState('cpp')
  const HandleLang = () => {
    if (document.getElementById('lang').value === 'C/C++')
    {
      setcode(cpp)
      setlang('cpp')
    }
    else if(document.getElementById('lang').value === 'Python'){
      setcode(python)
      setlang('python')
    }
  }
  const [takeinput,settakeinput]=useState('')
  const [input, setinput] = useState('No')
  const [output,setoutput]=useState('')
  const HandleInput = (e) => {
    e.preventDefault()
    if (input === 'No')
    {
      setinput('Yes')
    }
    else {
      setinput('No')
    }
    console.log(input)
  }
  const HandleCode = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/compile', { code, input, lang,takeinput })
      .then(res => {setoutput(res.data)})
      .catch(err=>{console.log(err)})
  }
  return (
    <div className="main">
      <h2>Online IDE</h2>
      <div className="container">
        <div className="editor">
          <h3>Code</h3>
          
          Language :{" "}
          <select id="lang" onChange={HandleLang}>
            <option value="C/C++" >C/C++</option>
            <option value="Python">Python</option>
          </select>
          <button onClick={HandleCode}>Run Code</button>
          <Editor height="90vh" width="50vw" defaultLanguage={lang} defaultValue={code}/>
        </div>
        <div className="in-out">
          <div className="in">
            <h3>Input</h3>
            <form>
              Give Input
               <button onClick={HandleInput} value={input}>{input}</button>
            </form>
            <textarea rows="10" cols="50" onChange={ e=>{settakeinput(e.target.value)}}/>
          </div>
          <div className="out">
            <h3>Output</h3>
            <textarea rows="10" cols="50" value={ output}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
