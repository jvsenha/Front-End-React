import "./style.css"
import Navbar from "../../components/Navbar"
import Input from '../../components/Input'
import Button from '../../components/Button';
import { useState } from "react";
const Cadcliente_Emp = () => {
    //Objeto cliente
    const cliente = {
        idCliente: 0,
        nomeCliente: '',
        emailCliente: '',
        usuarioCliente: '',
        senhaCliente: '',
        pastaCliente: ''
    }
    const [objCliente, setObjCliente] = useState(cliente);


    // dados dos formularios
    const cadastrar = () => {
        fetch('http://localhost:8080/cadastrar', {
            method:'POST',
            body:JSON.stringify(objCliente),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json' 
            }
        })
        .then(retorno => retorno.json())
        .then(retorno_convert => {
            if(retorno_convert.mensagem !== undefined){
                alert(retorno_convert.mensagem)
            }else{
                alert('cliente Cadastrado com sucesso!!')
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
                        <Input placeholder="Name" label="Name" name="nomeCliente" eventoTeclado={digitar} />
                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Email" name="emailCliente" label="Email" eventoTeclado={digitar} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Nome de Usuario" name="usuarioCliente" label="Nome de Usuario" eventoTeclado={digitar} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Senha" name="senhaCliente" label="Senha" eventoTeclado={digitar} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Pasta" label="Pasta" name="pastaCliente" eventoTeclado={digitar} />
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