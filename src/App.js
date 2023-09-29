import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { Home } from "./pages/home"
import { LoginEmp } from "./pages/login_emp"
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/loginemp" element={<LoginEmp />}></Route>
      </Routes> 
    </Router>
  );
}

export default App;
