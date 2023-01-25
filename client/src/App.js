
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Get } from './pages/get';
import { Navbar } from './Navbar';
import { Delete } from './pages/delete';
import { Post_app_context } from './pages/post_app_context';
import { Put } from './pages/put';
import { Post_obtain_app_loc_availability } from './pages/post_obtain_app_loc_availability';
import { Notifications } from './pages/notifications';

function App() {

  return (
    <div className="App">
      <Router> 
        <Navbar/>
        <Routes>
          <Route path="/get" element={<Get/>}/>
          <Route path="/post_app_context" element={<Post_app_context/>}/>
          <Route path="/put" element={<Put/>}/>
          <Route path="/delete" element={<Delete/>}/>
          <Route path="/post_obtain_app_loc_availability" element={<Post_obtain_app_loc_availability/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
        </Routes>
      </Router>
    </div>
  );
  };

export default App;
