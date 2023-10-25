import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Erro 404 - Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <p>Por favor, volte para a <Link to="/">página inicial</Link>.</p>
    </div>
  );
};

export  {NotFoundPage};