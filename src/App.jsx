import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer'; // Corrected casing
import { Routes, Route, useLocation } from 'react-router-dom'; // Removed unnecessary BrowserRouter
import Toss from './pages/Toss';
// import Spin from './pages/Spin';
import Casino from './pages/Casino';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
// import Spintwo from './pages/Spintwo';
import SpinWheel from './pages/SpinWheel';
import Slottwo from './pages/Slottwo';
import Slot from './pages/Slot';
import Tosst from './pages/Tosst';
import Register from './pages/Register';
import Profile from './pages/Profile';
import  Wallet  from './pages/Wallet';
import Activity from './pages/Activity';
import Promotion from './pages/Promotion';
import NewSlot from './pages/NewSlot';
import TossGame from './pages/TossGame';


const App = () => {
  const location = useLocation();

  // Condition to hide Header and Footer on the login page
  const showHeaderFooter = location.pathname !== '/login' && location.pathname !== '/register';
  // const showHeaderFooter2 = location.pathname !== '/register';
  


  return (
    <div className="overflow-hidden">
      <ToastContainer />
      {showHeaderFooter && <Header />} {/* Render Header only if not on Login page */}
      {/* {showHeaderFooter2 && <Header/> } */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/toss" element={<Toss />} /> */}
        <Route path="/tosst" element={<Tosst/>} />
        {/* <Route path="/slot" element={<Slot />} /> */}
        <Route path="/casino" element={<Casino />} />
        <Route path="/slott" element={<Slottwo/>} />
        <Route path="/spinwheel" element={<SpinWheel/>} />
        <Route path="/secondtoss" element={<Tosst/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/activity" element={<Activity/>} />
        <Route path="/promo" element={<Promotion/>}/>
        <Route path="/newslot" element={<NewSlot/>} />
        <Route path="/toss" element={<TossGame/>} />
        {/* Consider adding a fallback route here */}
      </Routes>

      {/* <div className='bg-[#00000000]' ></div> */}

      {showHeaderFooter && <Footer />} {/* Render Footer only if not on Login page */}
    </div>
  );
};

export default App;
