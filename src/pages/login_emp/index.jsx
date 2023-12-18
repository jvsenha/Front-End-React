import "../../assets/style.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/Imagens/Primus_branca.png";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const LoginEmp = () => {
  const Credeciais = {
    login: "",
    senha_user: "",
  };
  const [objCredeciais, setObjCredeciais] = useState(Credeciais);
  const [userRole, setUserRole] = useState(null);

  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const logar = () => {
    // Obtém o token da sessão
    fetch('http://localhost:8000/api.php?action=getToken', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include', // Inclui as credenciais (cookies) na requisição
    })
    .then((retorno) => retorno.json())
    .then((retorno_convert) => {
      if (retorno_convert.token) {
        // Token encontrado na sessão, continue com a lógica do frontend
        setUserRole(retorno_convert.role);
  
        if (userRole !== 'cliente') {
          // Redireciona para a home do emp se o usuário não for cliente
          window.location.assign('http://localhost:3000/homeemp');
        } else {
          // Redireciona para a home do cliente se o usuário for cliente
          window.location.assign('http://localhost:3000/homecliente');
        }
      } else {
        // Token não encontrado na sessão, faz a autenticação
        fetch('http://localhost:8000/api.php?action=login', {
          method: 'POST',
          body: JSON.stringify(objCredeciais),
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
          },
        })
        .then((retorno) => retorno.json())
        .then((retorno_convert) => {
          if (retorno_convert.message !== undefined) {
            toast.error(retorno_convert.message);
          } else {
            // Armazena o token na sessão e continua com a lógica do frontend
            localStorage.setItem('token', retorno_convert.token);
  
            if (retorno_convert.role !== 'cliente') {
              // Redireciona para a home do emp se o usuário não for cliente
              window.location.assign('http://localhost:3000/homeemp');
            } else {
              // Redireciona para a home do cliente se o usuário for cliente
              window.location.assign('http://localhost:3000/homecliente');
            }
          }
        })
        .catch((error) => {
          console.error('Erro ao autenticar:', error);
        });
      }
    })
    .catch((error) => {
      console.error('Erro ao obter token da sessão:', error);
    });
  };
  

  const digitar = (e) => {
    setObjCredeciais({ ...objCredeciais, [e.target.name]: e.target.value });
    setIsBtnVisible(e.target.name === "senha_user" && e.target.value !== "");
  };

  return (
    <>
      <section className="body-container">
      <ToastContainer />
        <section className="Container-emp">
          <section className="Content-emp dark-emp">
            <img className="img-login" src={Logo} alt="" />
          </section>
          <section className="Content-emp">
            <div className="Main_content">
              <h1>Fazer login - empresa</h1>
              <form className="FormLogin">
                <Input
                  className="input-cad"
                  placeholder="Nome de Usuario"
                  name="login"
                  label="Nome de Usuario"
                  eventoTeclado={digitar}
                />
                <Input
                  className="input-cad"
                  placeholder="Senha"
                  name="senha_user"
                  label="Senha"
                  type={mostrarSenha ? "text" : "password"}
                  eventoTeclado={digitar}
                />
                <button
                  type="button"
                  onClick={toggleMostrarSenha}
                  className={`vision-cad ${isBtnVisible ? "" : "close-btn"}`}
                >
                  <span>
                    {mostrarSenha ? "Esconder Senha" : "Mostrar Senha"}
                  </span>
                </button>
              </form>

              <Button nome="Entrar" classname="Button" funcao={logar} />
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export { LoginEmp };

// <Link to="/login"> Fazer login</Link>
