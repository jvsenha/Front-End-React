
import Navbar from "../../components/Navbar";
import Search  from "../../components/Search";
import "./style.css"


const HomeCliente = () => {
    return (
        <>
            <Navbar></Navbar>
            <section className="main">
                <h1 className="Title">
                    Arquivo
                </h1>
                <Search />
            </section>
         
        </>
    );
}

export { HomeCliente };