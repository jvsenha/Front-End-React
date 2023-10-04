import "./style.css"
import Navbar from "../../components/Navbar"
import Input from '../../components/Input'
import Button from '../../components/Button';
import { useState } from "react";

const CadArquivo_Emp = () =>{
    
    
    return (

        <>

            <Navbar page="Cadastrar cliente" />

            < div className="Main">
                <form className="Form" >
                    <div className="input">
                        <Input placeholder="Name" label="Name" />
                    </div>
                    <div className="input">
                        <Input className="input" placeholder="Email" label="Email" />

                    </div>
                    <div className="input">
                        <Input className="input" placeholder="Nome de Usuario" label="Nome de Usuario" />

                    </div>
                    <div className="input">
                        <Input className="input" placeholder="Senha" label="Senha" />

                    </div>
                    <div className="input">
                    <Input className="input" placeholder="Pasta" label="Pasta" />
                    </div>
                    <div className="button">
                        <Button nome="Cadastrar" classname="Cadastrar" />
                    </div>
                </form>
            </div>

        </>
    )
}


export {CadArquivo_Emp};