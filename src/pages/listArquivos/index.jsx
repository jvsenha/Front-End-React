import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search"
import Table_doc from "../../components/Tabela-doc"
import "./style.css"
import { useEffect, useState, useMemo } from "react"

const ListArquivosEmp  = () => {

    //usueState cliente
    const [arquivos, setArquivos] = useState([]);
    const token = localStorage.getItem('token');

    //useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        const fetchData = async () => {
            if (!token) {
                // Trate o caso em que o token não está disponível
                // Por exemplo, redirecione o usuário para fazer login
                return;
            }
    
            try {
                const response = await fetch("http://localhost:8080/documentos/listar", {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setArquivos(data);
                } else {
                    console.error('Erro ao buscar documentos. Resposta HTTP não está OK.');
                }
            } catch (error) {
                console.error('Erro ao buscar documentos', error);
            }
        };
    
        fetchData();
    }, []);

     const remover = (idDocumento) => {
        fetch(`http://localhost:8080/documentos/remover/${idDocumento}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convert => {
                alert(retorno_convert.message);
                fetch("http://localhost:8080/documentos/listar", {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(retorno => retorno.json())
                    .then(retorno_convert => setArquivos(retorno_convert));
            });
    }

    const [busca, setBusca] = useState('');

    const ArquivosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLowerCase().trim();
        return arquivos.filter(
            (arquivo) =>
            arquivo.usuario.nomeUser.toLowerCase().trim().includes(lowerBusca) ||
            arquivo.nomeDocumento.toLowerCase().trim().includes(lowerBusca)
        
        );
    }, [busca, arquivos]);


    return (
        <>

            <Sidebar page="Lista de Arquivos" />
            < section className="Main">
                <section className="header">
                    <h1>arquivos</h1>

                    <div class="icon-filter-search">

                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="36" viewBox="0 0 31 36" fill="none">
                            <path d="M19.3711 29.466C19.3711 30.4838 18.7035 31.8187 17.8526 32.3359L15.5 33.8543C13.3142 35.2059 10.2773 33.6875 10.2773 30.9844V22.0575C10.2773 20.8728 9.60988 19.3544 8.92576 18.5201L2.51836 11.779C1.66738 10.928 1 9.42633 1 8.4085V4.53737C1 2.51839 2.51844 1 4.37057 1H26.6293C28.4814 1 30 2.51839 30 4.37052V8.07477C30 9.42632 29.149 11.1116 28.3147 11.9459" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22.291 25.2111C25.2399 25.2111 27.6305 22.8205 27.6305 19.8716C27.6305 16.9227 25.2399 14.5322 22.291 14.5322C19.3421 14.5322 16.9515 16.9227 16.9515 19.8716C16.9515 22.8205 19.3421 25.2111 22.291 25.2111Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M28.6316 26.2123L26.963 24.5437" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>


                    </div>
                    <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />
                    <hr />
                </section>
                <section className="table">
                    <Table_doc vetor={ArquivosFiltrados} 
                     onRemover={remover}/>

                </section>
        

            </section>


        </>
    )
}

export { ListArquivosEmp }

