
import React from 'react';
import './app.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Get } from './pages/get';
import { Navbar } from './navbar';
import { Delete } from './pages/delete';
import { Post_app_context } from './pages/post_app_context';
import { Put } from './pages/put';
import { Post_obtain_app_loc_availability } from './pages/post_obtain_app_loc_availability';
import { Notifications } from './pages/notifications';

function Home() {
  if (window.location.pathname === "/") {
    return (
      <div>
        <h4>Co-financed by</h4>
        <div className='cofinanced'>
          <a href="https://www.compete2020.gov.pt/">
            <img className='compete2020' src={require('./images/level_compete.png')} alt="compete2020" />
          </a>
          <a href="https://portaldosincentivos.pt/index.php/portugal-2020">
            <img className='portugal2020' src={require('./images/level_portugal-2020.png')} alt="portugal2020" />
          </a>
          <a href="https://ec.europa.eu/regional_policy/funding/erdf_en?etrans=pt">
            <img className='europa' src={require('./images/logos-FEDR_.png')} alt="europa" />
          </a>
        </div>
        <footer className="footer">
          <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">Apache License</a>
          <h4>Version 2.0, January 2004</h4>
          <h4 className='names'>Marina Albuquerque & Ricardo Mesquita</h4>
        </footer>
      </div>
    )
  }
  return null;
}



function App() {

  return (
    <div className="App">
      <Router> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
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
