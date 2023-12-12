import "../../assets/style.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/Imagens/Primus_branca.png";
import { useState } from "react";

const LoginEmp = () => {
  const Credeciais = {
    login: "",
    senhaUser: "",
  };
  const [objCredeciais, setObjCredeciais] = useState(Credeciais);

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const logar = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      fetch("http://localhost:8080/auth/loginemp", {
        method: "POST",
        body: JSON.stringify(objCredeciais),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((retorno) => retorno.json())
        .then((retorno_convert) => {
          if (retorno_convert.message !== undefined) {
            alert(retorno_convert.message);
          } else {
            // Armazene o token no localStorage
            localStorage.setItem("token", retorno_convert.token);

            window.location.assign("http://localhost:3000/homeemp");
          }
        });
    } else {
      fetch("http://localhost:8080/auth/validarToken", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((retorno) => retorno.json())
        .then((retorno_convert) => {
          const authority = retorno_convert.map((obj) => obj.authority);
          const authorities = authority.join();
          if (authorities !== "ROLE_EMP") {
            localStorage.removeItem("token");
            fetch("http://localhost:8080/auth/loginemp", {
              method: "POST",
              body: JSON.stringify(objCredeciais),
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
              },
            })
              .then((retorno) => retorno.json())
              .then((retorno_convert) => {
                if (retorno_convert.message !== undefined) {
                  alert(retorno_convert.message);
                } else {
                  // Armazene o token no localStorage
                  localStorage.setItem("token", retorno_convert.token);

                  window.location.assign("http://localhost:3000/homeemp");
                }
              });
          } else {
            window.location.assign("http://localhost:3000/homeemp");
          }
        });
    }
  };

  const digitar = (e) => {
    setObjCredeciais({ ...objCredeciais, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="body-container">
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
                  name="senhaUser"
                  label="Senha"
                  type={mostrarSenha ? "text" : "password"}
                  eventoTeclado={digitar}
                />
                <button
                  type="button"
                  onClick={toggleMostrarSenha}
                  className="vision-cad"
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
