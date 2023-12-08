import "./style.css";


const ListaReset = ( {vetor, funcao, onCancel}) => {

  return (
<>

<link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css" rel="stylesheet" />
{vetor.map((cliente) => (
  <div className="card-reset" key={cliente.idUser}>
  <div className="icon-card">
        <i className='bx bxs-shield-x'></i>
        </div>
        <div className="content-card">
            <span className="title-card">Alteração de senha!</span>
            <div className="desc"><b className="nome">{cliente.nomeUser}</b> solicitou uma alteração de senha</div> 
            <div className="actions">
                <div>
                    <button onClick={() => funcao(cliente.login)} className="Alterar">Alterar</button>
                </div>
                <div>
                <button onClick={() => onCancel(cliente.login)}  className="Cancelar">Rejeitar</button>
                </div>
            </div>    
        </div>
        
        </div>
        ))}
</>
  );
};

export default ListaReset;