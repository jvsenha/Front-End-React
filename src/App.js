import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { Home } from "./pages/home"
import { LoginEmp } from "./pages/login_emp"
import { Home_Emp} from "./pages/home_emp"
import {Cadcliente_Emp} from "./pages/CadCliente_emp"
import {CadArquivo_Emp} from "./pages/cadArquivo_emp"
import {ListCliente_emp} from "./pages/listCliente_emp"
import {ListArquivos_emp} from "./pages/listArquivos_emp"
import {AlterarCliente} from "./pages/alterarCliente"
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/loginemp" element={<LoginEmp />}></Route>
        <Route path="/homeemp" element={<Home_Emp />}></Route>
        <Route path="/cadCliente-emp" element={<Cadcliente_Emp />}></Route>
        <Route path="/cadArquivo-emp" element={<CadArquivo_Emp />}></Route>
        <Route path="/listCliente-emp" element={<ListCliente_emp />}></Route>
        <Route path="/listArquivo-emp" element={<ListArquivos_emp />}></Route>
        <Route path="/alterarCliente/:idUser" element={<AlterarCliente/>}></Route>
      </Routes> 
    </Router>
  );
}

export default App;
