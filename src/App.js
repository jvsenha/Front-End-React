import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Home } from "./pages/login";
import { LoginEmp } from "./pages/login_emp";
import { HomeEmp } from "./pages/home_emp";
import { HomeCliente } from "./pages/home_cliente";
import { CadClienteEmp } from "./pages/CadCliente";
import { CadArquivoEmp } from "./pages/cadArquivo";
import { ListClienteEmp } from "./pages/listCliente";
import { ListArquivosEmp } from "./pages/listArquivos";
import { AlterarCliente } from "./pages/alterarCliente";
import { NotFoundPage } from "./pages/NotFoundPage";
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [UserRole, setUserRole] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8080/auth/validarToken', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(retorno => retorno.json())
      .then(retorno_convert => {
        if (retorno_convert.message !== undefined) {
          alert(retorno_convert.message);
        } else {
          const authorities = retorno_convert.map(obj => obj.authority);
          setUserRole(authorities[0]);
        }
      });
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<LoginEmp />} />

        {UserRole === "ROLE_EMP" && (
          <>
            <Route path="/homeemp" element={<HomeEmp />} />
            <Route path="/cadCliente" element={<CadClienteEmp />} />
            <Route path="/cadArquivo/:idUser" element={<CadArquivoEmp />} />
            <Route path="/listCliente" element={<ListClienteEmp />} />
            <Route path="/listArquivo" element={<ListArquivosEmp />} />
            <Route path="/alterarCliente/:idUser" element={<AlterarCliente />} />
          </>
        )}

        {UserRole === "ROLE_USER" && (
          <Route path="/homeclt" element={<HomeCliente />} />
        )}

        {/* Rota de página não encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
