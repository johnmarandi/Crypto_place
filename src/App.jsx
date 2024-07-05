import React from 'react'
import NavBar from './Components/NavBar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './Components/Footer/Footer'
const App = () => {
  let Info={
    email:"john@gmail.com",
    phone:"234454"
  }
  return (
    
      <div className='app'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin headerInfo={Info}/>}/>
      </Routes>
      <Footer/>
      </div>
    
  )
}

export default App
