import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import AdminScreen from './screens/AdminScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<LandingScreen/>}/>
          <Route path='/home' element = {<HomeScreen/>}/>
          <Route path='/book/:roomId/:fromDate/:toDate' element = {<BookingScreen />}/>
          <Route path='/register' element = {<RegisterScreen/>}/>
          <Route path='/login' element = {<LoginScreen/>}/>
          <Route path='/profile' element = {<ProfileScreen/>}/>
          <Route path='/admin' element={<AdminScreen/>}/>
        </Routes>
      </Router>
    </div>
  )
}
