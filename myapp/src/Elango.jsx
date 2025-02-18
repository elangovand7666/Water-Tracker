import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login.jsx'
import Create from './Create.jsx';
import Start from './Start.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import './Home.css'

function Elango() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/Login' element={<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/Home/:id' element={<Home/>}/>
        <Route path='/About/:id' element={<About/>}/>
      </Routes>
    </Router>
    <footer >&copy; designed by Elangovan.D</footer>
    </>
  )
}

export default Elango
