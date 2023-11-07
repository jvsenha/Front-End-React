import '../../assets/style.css';
import Sidebar from "../../components/Sidebar"
import ListaReset from "../../components/ListaReset"


const HomeEmp = () => {


    return (
        <>

            <Sidebar page="Dashboard" />
            <section className="section-reset">
                <section className="main-reset">
                    <div className='teste-div'>
1
                    </div>
                    <div className='solicitacao-div' >
                    <h1 className="Title">
                           Solicitações
                    </h1>
                        <ListaReset />
                        <ListaReset />
                        <ListaReset />
                        <ListaReset />
                        <ListaReset />
                        <ListaReset />
                        <ListaReset />
                        <ListaReset />
                        <ListaReset />

                    </div>
                </section >
            </section >
        </>
    )
}

export { HomeEmp };