import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { Home } from "./pages/login"
import { LoginEmp } from "./pages/login_emp"
import { HomeEmp} from "./pages/home_emp"
import { HomeCliente} from "./pages/home_cliente"
import {CadClienteEmp} from "./pages/CadCliente"
import {CadArquivoEmp} from "./pages/cadArquivo"
import {ListClienteEmp} from "./pages/listCliente"
import {ListArquivosEmp} from "./pages/listArquivos"
import {AlterarCliente} from "./pages/alterarCliente"
import './App.css';

const Cliente = {
  permissions: ['read:client']
};

const Empresa = {
  permissions: ['create:cliente']
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/empresa" element={<LoginEmp />}></Route>
        <Route path="/homeemp" element={<HomeEmp />}></Route>
        <Route path="/homeclt" element={<HomeCliente />}></Route>
        <Route path="/cadCliente" element={<CadClienteEmp />}></Route>
        <Route path="/cadArquivo" element={<CadArquivoEmp />}></Route>
        <Route path="/listCliente" element={<ListClienteEmp />}></Route>
        <Route path="/listArquivo" element={<ListArquivosEmp />}></Route>
        <Route path="/alterarCliente/:idUser" element={<AlterarCliente/>}></Route>
      </Routes> 
    </Router>
  );
}

export default App;
