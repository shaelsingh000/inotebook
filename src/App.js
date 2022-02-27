import './App.css'
import Navbar from './component/navbar'
import Home from './component/Home'
import About from './component/About'
import React from 'react'
import Login from './component/Login'
import Signup from './component/Signup'
import Alert  from './component/alert'
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Notestate from './context notes/Notestate'



function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }


  return (
      <>
      <Notestate>
      <BrowserRouter>
      <Navbar />
      <Alert alert = {alert} />
      <div className='container my-3'>
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
        <Route exact path="/about" element={<About showAlert={showAlert}/>}/>
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>  
      </Routes>
      </div>
      </BrowserRouter>
      </Notestate>
      </>
  );
}

export default App;
