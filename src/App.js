import { useState } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Notfound from './components/Notfound';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Login'
import { Outlet } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function BasicLayout() {
  return (
    <>
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="app-content">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
    </>
  );
}


function App() {

  const [users, setUsers] = useState({});

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BasicLayout/>}>
        <Route index element={<Homepage/>}/>
      </Route>
      <Route path='/login' element={<BasicLayout/>}>
        <Route index element={<Login
          setUsers={setUsers}
        />}/>
      </Route>
      <Route path='*' element={<Notfound/>}/>
    </Routes>
  </BrowserRouter>
  );
}
export default App;