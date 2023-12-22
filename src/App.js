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
import { ConfiguracoesAdm } from "./pages/ConfiguracoesAdm";
import { ConfiguracoesCliente } from "./pages/configuracoesCliente";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AlterarSenha } from "./pages/AlterarSenha";
import { ListClienteEmp } from "./pages/listCliente";
import { ListCltInativosEmp } from "./pages/listClienteinativos";
import { AlterarCliente } from "./pages/alterarCliente";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Loading } from "./pages/Loading"
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [UserRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
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
      })
      .finally(() => setLoading(false)); // Set loading to false after authentication check
    } else {
      setLoading(false); // No token, set loading to false
    }
  }, [token]);

  // Show loading spinner or some indication while checking authentication
  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="Primus/" element={<Home />} />
        <Route path="Primus/empresa" element={<LoginEmp />} />
        <Route path="Primus/forgotPassword" element={<ForgotPassword />} />

        {UserRole === "ROLE_EMP" && (
          <>
            <Route path="Primus/homeemp" element={<HomeEmp />} />
            <Route path="Primus/cadCliente" element={<CadClienteEmp />} />
            <Route path="Primus/listCliente" element={<ListClienteEmp />} />
            <Route path="Primus/listClienteInativos" element={<ListCltInativosEmp />} />
            <Route path="Primus/alterarCliente/:idUser" element={<AlterarCliente />} />
            <Route path="Primus/configuracoesAdm/:idUser" element={<ConfiguracoesAdm />} />
          </>
        )}

        {UserRole === "ROLE_USER" && (
          <>
            <Route path="Primus/homeclt" element={<HomeCliente />} />
            <Route path="Primus/configuracoesCliente/:idUser" element={<ConfiguracoesCliente />} />
            <Route path="Primus/alterarSenha/:idUser" element={<AlterarSenha />} />
          </>
        )}

        {/* Rota de página não encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
