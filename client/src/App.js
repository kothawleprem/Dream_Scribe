import logo from './logo.svg';
import './App.css';
import Landing from './Screens/Landing';
import {  Routes, Route } from "react-router-dom";
import Home from './Screens/Home';
import Email from './Screens/Onboading/Email';
import Verify from './Screens/Onboading/Verify';
import Input from './Pages/Input/Input';
import Options from './Pages/Options/Options';
import Poem from './Pages/Poem/Poem';
import Analyze from './Pages/Analyze/Analyze';

function App() {
  return (
    
    <div>
  
         <Routes>
                <Route exact path='/' element={<Landing  />}></Route>
                <Route exact path='/home' element={<  Home/>}></Route>
                <Route exact path='/email' element={<  Email/>}></Route>
                <Route exact path='/verify' element={<  Verify/>}></Route>
                <Route exact path="/input" element={<Input/>}></Route>
                <Route exact path="/options" element={<Options/>}></Route>
                <Route exact path="/poem" element={<Poem/>}></Route>
                <Route exact path='/analyze' element={<Analyze/>}></Route>
        </Routes>
    

    </div>
  );
}

export default App;
