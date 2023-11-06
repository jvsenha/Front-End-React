import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search"
import Tabledoc from "../../components/Tabela-doc"
import "../../assets/style.css"
import { useEffect, useState, useMemo } from "react"

const ListArquivosEmp = () => {

    //usueState cliente
    const [arquivos, setArquivos] = useState([]);
    const token = localStorage.getItem('token');

    //useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
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
        const resultado = window.confirm("Você tem certeza que deseja continuar?");
        if (resultado === true) {
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
        } else {
            alert("Ação cancelada!!");
        }
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

    const excluirDrive = async (fileId) => {
        const token = localStorage.getItem('token');
      
        try {
          const response = await fetch(`http://localhost:8000/deletar/${fileId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (response.ok) {
            alert('Pasta excluída com sucesso do Google Drive');
          } else {
            console.error('Erro ao excluir a pasta do Google Drive.');
          }
        } catch (error) {
          console.error('Erro durante a exclusão da pasta no Google Drive:', error);
        }
      }
      const downloadFile = async (fileId, nomeDocumento) => {
        try {
          const response = await fetch(`http://localhost:8000/download/${fileId}/${nomeDocumento}`, {
            method: 'GET',
          });

          if (response.ok) {
            // Aqui você pode tratar a resposta, como salvar o arquivo ou exibir uma mensagem ao usuário
            // No exemplo abaixo, estamos salvando o arquivo com o nome fornecido pelo servidor
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = nomeDocumento; // Use o nome do arquivo fornecido
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
            console.error('Erro ao baixar o arquivo:', response.statusText);
            // Aqui você pode tratar o erro, como exibir uma mensagem de erro ao usuário
          }
        } catch (error) {
          console.error('Erro ao baixar o arquivo:', error);
          // Trate erros de rede ou exceções aqui, se necessário
        }
      };
      
      

    


    return (
        <>
            <section className='listcliente'>
                <Sidebar page="Lista de Arquivos" />

                <section className="Main-listC">
                    <section className="header-listC">
                        <h1 className="Title">
                            Arquivo
                        </h1>

                        <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />

                    </section>
                    <section className="table">
                        <Tabledoc vetor={ArquivosFiltrados}
                            onRemover={remover}
                            onDownload={downloadFile} />

                    </section>


                </section>

            </section>


        </>
    )
}

export { ListArquivosEmp }

