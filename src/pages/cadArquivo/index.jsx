import "./style.css"
import Sidebar from "../../components/Sidebar"
import InputUpload from '../../components/InputUpload'



const CadArquivoEmp = () =>{
    
    
    return (

        <>

            <Sidebar page="Cadastrar arquivo" />

            < div className="Main">
                <form className="Form" >
            
                    <div className="input">
                    <InputUpload className="input" placeholder="Pasta" label="Pasta" />
                    </div>
                </form>
            </div>

        </>
    )
}


export {CadArquivoEmp};