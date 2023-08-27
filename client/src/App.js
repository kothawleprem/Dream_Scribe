import logo from './logo.svg';
import './App.css';
import Landing from './Screens/Landing';
import {  Routes, Route } from "react-router-dom";
import Home from './Screens/Home';
import Email from './Screens/Onboading/Email';
import Verify from './Screens/Onboading/Verify';


function App() {
  return (
    
    <div>
  
         <Routes>
                <Route exact path='/' element={<Landing  />}></Route>
                <Route exact path='/home' element={<  Home/>}></Route>
                <Route exact path='/email' element={<  Email/>}></Route>
                <Route exact path='/verify' element={<  Verify/>}></Route>
        </Routes>
    

    </div>
  );
}

export default App;
