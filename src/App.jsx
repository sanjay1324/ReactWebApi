import './App.css'
import React from 'react';
import Crud from './Components/Crud'
import Login from './Components/Login'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register'; 
import Topic from './Components/Topic'
import Venues from './Components/Venue';
// import Home from './Components/Home';
import EnrollmentProcess from './Components/Enrollment'
import VenueBookingForm from './Components/VenueBooking';
import LectureBookingProcess from './Components/LectureBookingProcess'
import StudentPage from './Pages/StudentPage';
function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* <Route path='/' element={<Home/>} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Courses" element={<Crud />} />
          <Route path='/StudentPage/*' element = {<StudentPage/>}/>
          <Route path="/Register" element={<Register />} />
          <Route path="/Topic" element={<Topic />} />
          <Route path="/Venue" element={<Venues />} />
          <Route path="/EnrollmentProcess" element={<EnrollmentProcess/>} />
          <Route path='/VenueBookingProcess'element={<VenueBookingForm/>}/>
          <Route path='/LectureEnrollmentProcess' element={<LectureBookingProcess/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App
