import "./style.css"
import Navbar from "../../components/Navbar"
import Input from '../../components/Input'
import Button from '../../components/Button';
import { useState } from "react";
const Cadcliente_Emp = () => {
    //Objeto cliente
    const cliente = {
        idCliente: 0,
        nomeUser: "",
        login: "",
        senhaUser: "",
        pastaCliente: "",
        emailCliente: "",
        role: "USER"
    }
    const [objCliente, setObjCliente] = useState(cliente);


    const limparform = () => {
        setObjCliente(cliente)
    }

    // dados dos formularios
    const cadastrar = () => {
        fetch('http://localhost:8080/auth/cadastrar', {
            method: 'POST',
            body: JSON.stringify(objCliente),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convert => {
                if (retorno_convert.message !== undefined) {
                    alert(retorno_convert.message)
                } else {
                    alert('cliente Cadastrado com sucesso!!')
                    limparform();
                }


            })
    }

    const digitar = (e) => {
        setObjCliente({ ...objCliente, [e.target.name]: e.target.value });
    }


    //cadastrar produto
    return (
        <>

            <Navbar page="Cadastrar cliente" />

            < div className="Main">
                <form className="Form">
                    <div className="input-cad">
                        <Input placeholder="Name" label="Name" name="nomeUser" eventoTeclado={digitar} obj={objCliente.nomeUser} />
                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Email" name="emailCliente" label="Email" eventoTeclado={digitar} obj={objCliente.emailCliente} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Nome de Usuario" name="login" label="Nome de Usuario" eventoTeclado={digitar} obj={objCliente.login} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Senha" name="senhaUser" label="Senha" eventoTeclado={digitar} obj={objCliente.senhaUser} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Pasta" label="Pasta" name="pastaCliente" eventoTeclado={digitar} obj={objCliente.pastaCliente} />
                    </div>
                    <div className="button">
                        <Button nome="Cadastrar" classname="Cadastrar" funcao={cadastrar} />
                    </div>
                </form>

            </div>

        </>
    )
}

export { Cadcliente_Emp };