import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './Pages/home_1';
import Features from './Pages/features';
import Pricing from './Pages/pricing';


function Routing() {
  return (
    
      <div className="Routing">
        
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>} />
              <Route path='/home' element={<Home/>} />
              <Route path='/features' element={<Features/>} />
              <Route path='/pricing' element={<Pricing/>} />
            </Routes>
        </BrowserRouter>
      </div>

      
  );
}

export default Routing;
