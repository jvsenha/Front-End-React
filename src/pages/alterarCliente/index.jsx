import "../../assets/style.css";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const AlterarCliente = () => {
  const token = localStorage.getItem("token");
  const { idUser } = useParams();

  // Estado para os campos do formulário
  const [nomeUser, setNomeUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [login, setLogin] = useState("");
  const [senhaUser, setSenhaUser] = useState("");
  const [pastaCliente, setPastaCliente] = useState("");
  const [role, setRole] = useState("");
  const [isenabled, setIsenabled] = useState("");
  const [reset, setReset] = useState("");
  const [pastas, setPastas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pastas
        const filesResponse = await fetch(
          "https://app.compreagua.com.br/api.php?action=listarArquivo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (filesResponse.ok) {
          const filesData = await filesResponse.json();
          setPastas(filesData);
        } else {
          throw new Error("Erro ao obter os arquivos.");
        }

        // Fetch client data
        const idUserObj = {
          id_user: idUser,
        };

        const response = await fetch(
          "https://app.compreagua.com.br/api.php?action=carregarCliente",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(idUserObj),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao carregar cliente: ${response.status}`);
        }

        const objClienteData = await response.json();

        // Update states with values from the API
        setNomeUser(objClienteData.nome_user);
        setEmailUser(objClienteData.email_user);
        setLogin(objClienteData.login);
        setSenhaUser(objClienteData.senha_user);
        setPastaCliente(objClienteData.pasta_cliente);
        setRole(objClienteData.role);
        setIsenabled(objClienteData.is_enabled);
        setReset(objClienteData.reset);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, [idUser, token]);

  // Function to handle form submission
  const alterar = () => {
    // Email validation
    if (!validarEmail(emailUser)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    // Logic to send updated data to the server
    const dadosAtualizados = {
      id_user: idUser,
      nome_user: nomeUser,
      login: login,
      senha_user: senhaUser,
      role: role,
      email_user: emailUser,
      is_enabled: isenabled,
      pastaCliente: pastaCliente,
      reset: reset,
    };

    fetch(`https://app.compreagua.com.br/api.php?action=alterarUsuario`, {
      method: "PUT",
      body: JSON.stringify(dadosAtualizados),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 422) {
          return response.json().then((data) => {
            toast.error(`Erro: ${data.error}`);
          });
        } else if (response.status === 200) {
          toast.success("Operação realizada com sucesso!");
        } else {
          console.error(
            `Erro na requisição: ${response.status} ${response.statusText}`
          );
          toast.error("Erro na requisição");
        }
      })
      .catch((error) => {
        console.error(`Erro na: ${error.message}`);
        toast.error(`Erro na: ${error.message}`);
      });
  };

  const voltar = () => {
    // Use window.history.back() or window.history.go(-1) to go back
    window.history.back();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      alterar();
    }
  };

  return (
    <>
      <Sidebar page="Alterar cliente" />
      <ToastContainer />
      <div className="Main-cadC">
        <form className="Form">
          <div className="input-cad">
            <Input
              placeholder="Nome do Cliente"
              label="Nome do Cliente"
              onKeyDown={handleKeyDown}
              name="nomeUser"
              maxLength={99}
              eventoTeclado={(e) => setNomeUser(e.target.value)}
              obj={nomeUser}
            />
          </div>
          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="E-mail"
              name="emailUser"
              onKeyDown={handleKeyDown}
              label="E-mail"
              maxLength={99}
              eventoTeclado={(e) => setEmailUser(e.target.value)}
              obj={emailUser}
            />
          </div>
          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="Login"
              name="login"
              label="Login"
              eventoTeclado={(e) => setLogin(e.target.value)}
              onKeyDown={handleKeyDown}
              obj={login}
              maxLength={49}
            />
          </div>
          <div className="input-cadC">
            <select
              id="selectPasta"
              name="pastaCliente"
              value={pastaCliente}
              onChange={(e) => {
                setPastaCliente(e.target.value);
              }}
            >
              <option value="">Selecione uma pasta</option>
              {pastas.map((pasta) => (
                <option key={pasta.name} value={pasta.name}>
                  {pasta.name}
                </option>
              ))}
            </select>
          </div>
          <div className="button">
            <Button nome="Alterar" classname="Alterar" funcao={alterar} />
            <Button nome="Voltar" funcao={voltar} />
          </div>
        </form>
      </div>
    </>
  );
};

export { AlterarCliente };
