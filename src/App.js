import './App.css';
import Encrypter from './components/Encrypter';
import Home from './components/Home';
import Header from './components/Header';
// import { AppRouter } from './AppRouter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Home />} />
         
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
