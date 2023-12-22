import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/login";
import { HomeEmp } from "./pages/home_emp";
import { HomeCliente } from "./pages/home_cliente";
import { CadClienteEmp } from "./pages/CadCliente";
import { ConfiguracoesAdm } from "./pages/ConfiguracoesAdm";
import { ConfiguracoesCliente } from "./pages/configuracoesCliente";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AlterarSenha } from "./pages/AlterarSenha";
import { ListClienteEmp } from "./pages/listCliente";
import { AlterarCliente } from "./pages/alterarCliente";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Loading } from "./pages/Loading";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8000/api.php?action=decodeToken", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((retorno) => retorno.json())
        .then((retorno_convert) => {
          if (retorno_convert.message !== undefined) {
            alert(retorno_convert.message);
          } else {
            // Se o retorno_convert já é um objeto, você pode acessar diretamente a propriedade 'role'
            setUserRole(retorno_convert.role);
          }
        })
        .finally(() => setLoading(false)); // Defina loading para false após a verificação de autenticação
    } else {
      setLoading(false); // Sem token, defina loading para false
    }
  }, [token]);

  // Show loading spinner or some indication while checking authentication
  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {userRole === "empresa" && (
          <>
            <Route path="/homeemp" element={<HomeEmp />} />
            <Route path="/cadCliente" element={<CadClienteEmp />} />
            <Route path="/listCliente" element={<ListClienteEmp />} />
            <Route
              path="/alterarCliente/:idUser"
              element={<AlterarCliente />}
            />
            <Route
              path="/configuracoesAdm/:idUser"
              element={<ConfiguracoesAdm />}
            />
          </>
        )}

        {userRole === "cliente" && (
          <>
            <Route path="/homeclt" element={<HomeCliente />} />
            <Route
              path="/configuracoesCliente/:idUser"
              element={<ConfiguracoesCliente />}
            />
            <Route path="/alterarSenha/:idUser" element={<AlterarSenha />} />
          </>
        )}
        {/* Rota de página não encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
