import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './Pages/Home';
import Features from './Pages/Features';
import Pricing from './Pages/Pricing';


function Routing() {
  return (
    
      <div className="App">
        
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/Features' element={<Features/>} />
            <Route path='/Pricing' element={<Pricing/>} />
            </Routes>
        </BrowserRouter>
      </div>

      
  );
}

export default Routing;
