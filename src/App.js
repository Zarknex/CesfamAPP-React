import './App.css';
import Homepage from './components/Homepage';
import { Notfound } from './components/Notfound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
  <BrowserRouter>
    <Layout/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='*' element={<Notfound/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

//<Header/>
//<Homepage/>
//<Footer/>
