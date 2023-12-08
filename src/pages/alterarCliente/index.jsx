import "../../assets/style.css";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LinkButton from "../../components/Link-Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlterarCliente = () => {
  const { idUser } = useParams();

  // Estado para armazenar os dados do cliente
  const [clienteData, setClienteData] = useState({
    nome_user: "",
    email_user: "",
    login: "",
    senha_user: "",
    pasta_cliente: "",
    // Add other properties as needed
  });

  // useEffect para carregar os dados do cliente
  const carregarCliente = async () => {
    try {
      const idUserObj = {
        id_user: idUser,
      };

      const response = await fetch(
        "http://localhost:8000/api.php?action=carregarCliente",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(idUserObj),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao carregar cliente: ${response.status}`);
      }

      const clienteData = await response.json();

      // Atualize o estado com os valores obtidos da API
      setClienteData(clienteData);
    } catch (error) {
      console.error("Error fetching cliente:", error.message);
    }
  };

  // Uso do useEffect
  useEffect(() => {
    carregarCliente();
  }, []);

  // Função para lidar com a submissão do formulário
  const alterar = () => {
    const dadosAtualizados = {
      idUser,
      nomeUser: clienteData.nome_user,
      emailCliente: clienteData.email_user,
      login: clienteData.login,
      senhaUser: clienteData.senha_user,
      pastaCliente: clienteData.pasta_cliente,
      role: "USER",
    };

    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/cliente/alterar/${idUser}`, {
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
            toast.error(data.message);
            carregarCliente();
          });
        } else if (response.status === 200) {
          toast.success("Operação realizada com sucesso!");
          return response.json();
        } else {
          console.error(
            `Erro na requisição: ${response.status} ${response.statusText}`
          );
          toast.error("Erro na requisição");
          // Pode adicionar tratamento para outros status aqui, se necessário
        }
      })
      .catch((error) => {
        console.error(`Erro na requisição: ${error.message}`);
        toast.error(`Erro na requisição: ${error.message}`);
      });
  };

  return (
    <>
      <Sidebar page="Alterar cliente" />
      <ToastContainer />
      <div className="Main-cadC">
        <form className="Form">
          <div className="input-cad">
            <Input
              placeholder="Nome"
              label="Nome"
              name="nome_user"
              eventoTeclado={(e) => setClienteData({ ...clienteData, nome_user: e.target.value })}
              value={clienteData.nome_user}
            />
          </div>
          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="Email"
              name="email_user"
              label="Email"
              eventoTeclado={(e) => setClienteData({ ...clienteData, email_user: e.target.value })}
              value={clienteData.email_user}
            />
          </div>
          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="Nome de Usuario"
              name="login"
              label="Nome de Usuario"
              eventoTeclado={(e) => setClienteData({ ...clienteData, login: e.target.value })}
              value={clienteData.login}
            />
          </div>

          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="Pasta"
              label="Pasta"
              name="pasta_cliente"
              eventoTeclado={(e) => setClienteData({ ...clienteData, pasta_cliente: e.target.value })}
              value={clienteData.pasta_cliente}
            />
          </div>
          <div className="button">
            <Button nome="Alterar" classname="Alterar" funcao={alterar} />
            <LinkButton nome="Voltar" classname="Voltar" link="/listCliente" />
          </div>
        </form>
      </div>
    </>
  );
};

export { AlterarCliente };
