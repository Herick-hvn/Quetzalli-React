import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 
import LandingPageClienteComponent from './pages/LandingPageClienteComponent';
import LoginForm from "./pages/LoginForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<LandingPageClienteComponent />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
