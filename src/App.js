import './App.css';

import Home from './components/Home';


import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
function App() {
  const [charList, setCharList] = useState(["*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  function changeList(list) {
    setCharList(list)
    console.log(list)
  }


  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
