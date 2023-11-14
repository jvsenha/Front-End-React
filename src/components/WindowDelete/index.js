import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const WindowDelete = ({ closeToast, confirmAction, onCancel }) => (
  <div>
    <p>Você tem certeza que deseja Deletar?</p>
    <button onClick={() => { confirmAction(); closeToast(); }}>Deletar</button>
    <button style={{ backgroundColor: "#F1C40F", width: "110px", border:"0"  }} onClick={() => { onCancel(); closeToast(); }}>Cancelar</button>
  </div>
);

export default WindowDelete;