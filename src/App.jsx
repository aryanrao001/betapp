import React from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer' // Corrected casing
import { Router , BrowserRouter, Routes, Route } from 'react-router-dom' // Corrected import
import Toss from './pages/Toss'
import Spin from './pages/Spin'
import Casino from './pages/Casino'

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toss' element={<Toss/> }/>
          <Route path='/spin' element={<Spin/>}/>
          <Route path='/casino' element={<Casino/> }/>
          {/* Consider adding a fallback route here */}
        </Routes>
      <Footer />
    </div>
  )
}

export default App
