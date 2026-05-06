import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Yourproject from './Component/Yourproject';
import Createproject from './Component/Createproject';
import Joinproject from './Component/Joinproject';
import Project from './Component/Project';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/dashboard' element={<Home/>}/>
        <Route path = "/project/:projectid" element={<Project/>}/>
      </Routes>
     </BrowserRouter>
    </>
  );
}


export default App;
