import React, { useEffect } from 'react';


import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';




import {Routes,Route} from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';

const App = () => {
  const {authUser, checkAuth}= useAuthStore()
  useEffect(() => {
    checkAuth()
  },[checkAuth]);

  console.log( {authUser} );
  
  return (
    <>
    <Navbar />
    
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={< LoginPage />} />
      <Route path="/settings" element={<SettingsPage/>} />
      <Route path="/profile" element={<ProfilePage />} />


    </Routes>
    
    
    </>
  )
}

export default App;
