import React, { useState } from 'react';
import './app.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Get } from './pages/get';
import { Navbar } from './navbar.js';
import { Delete } from './pages/delete';
import { Post_app_context } from './pages/post_app_context';
import { Put } from './pages/put';
import { Post_obtain_app_loc_availability } from './pages/post_obtain_app_loc_availability';
import { Notifications } from './pages/notifications';
import { Login } from './pages/login';
import { useCookies } from 'react-cookie';

function Home() {

  const [cookies] = useCookies(['username']);
  const username = cookies.username;


  if (window.location.pathname === '/') {
    return (
      <div className='page'>
        <div className='welcome'>
          {username ?
              <h4 className='welcome_text'>Welcome, {username}!</h4>
              :
              <h4 className='welcome_text'>Welcome, please log in...</h4>
            }
        </div>
        <div className='partners'>
          <h4 className='partners_text'>Partners</h4>
          <div className='image-text-row'>
            <div className='image-text'>
              <img src={require('./images/dstelecom.png')} alt="dstelecom" className="partner_imgs"/>
              <h4 className='company_name'>DSTELECOM S.A.</h4>
              <h4 className='company'>Leader Company</h4>
            </div>
            <div className='image-text'>
              <img src={require('./images/bee.png')} alt="bee" className="partner_imgs" />
              <h4 className='company_name'>Bee Engineering S.A.</h4>
              <h4 className='company'>Company</h4>
            </div>
            <div className='image-text'>
              <img src={require('./images/fapajal.png')} alt="fapajal" className="partner_imgs" />
              <h4 className='company_name'>FAPAJAL PAPERMAKING S.A.</h4>
              <h4 className='company'>Company</h4>
            </div>
          </div>
          <div className='image-text-row'>
            <div className='image-text'>
              <img src={require('./images/bySteel.png')} alt="bySteel" className="partner_imgs" />
              <h4 className='company_name'>BYSTEEL FS S.A</h4>
              <h4 className='company'>Company</h4>
            </div>
            <div className='image-text'>
              <img src={require('./images/uMinho.png')} alt="uMinho" className="partner_imgs" />
              <h4 className='company_name'>University of Minho</h4>
              <h4 className='company'>Academia</h4>
            </div>
            <div className='image-text'>
              <img src={require('./images/it.png')} alt="it" className="partner_imgs" />
              <h4 className='company_name'>Instituto de Telecomunicações</h4>
              <h4 className='company'>Academia</h4>
            </div>
          </div>
        </div>
        <div className='cofinanced'>
          <h4>Co-financed by</h4>
          <a href='https://www.compete2020.gov.pt/'>
            <img className='compete2020' src={require('./images/level_compete.png')} alt='compete2020' />
          </a>
          <a href='https://portaldosincentivos.pt/index.php/portugal-2020'>
            <img className='portugal2020' src={require('./images/level_portugal-2020.png')} alt='portugal2020' />
          </a>
          <a href='https://ec.europa.eu/regional_policy/funding/erdf_en?etrans=pt'>
            <img className='europa' src={require('./images/logos-FEDR_.png')} alt='europa' />
          </a>
       

        </div>
        <footer className='footer'>
          <a href='https://www.apache.org/licenses/LICENSE-2.0' target='_blank' rel='noopener noreferrer'>
            Apache License
          </a>
          <h4>Version 2.0, January 2004</h4>
          <h4 className='names'>Marina Albuquerque & Ricardo Mesquita</h4>
        </footer>
      </div>
    );
  }

  return null;
}

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/get' element={<Get />} />
          <Route path='/post_app_context' element={<Post_app_context />} />
          <Route path='/put' element={<Put />} />
          <Route path='/delete' element={<Delete />} />
          <Route
            path='/post_obtain_app_loc_availability'
            element={<Post_obtain_app_loc_availability />}
          />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
