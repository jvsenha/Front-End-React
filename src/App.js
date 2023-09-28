import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { Home } from "./pages/home"
import { Login } from "./pages/login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes> 
    </Router>
  );
}

export default App;
