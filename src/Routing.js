import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './Pages/home_1';
import Personal_Statement from './Pages/Personal_Statement';
import Send_Email from './email/email';
import Project from './Pages/Project';

function Routing() {
  return (
    
      <div className="Routing">
        
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>} />
              <Route path='/home' element={<Home/>} />
              <Route path='/Personal_Statement' element={<Personal_Statement/>} />
              <Route path='/Project' element={<Project/>} />
              <Route path='/send_email' element={<Send_Email/>} />
            </Routes>
        </BrowserRouter>
      </div>

      
  );
}

export default Routing;
