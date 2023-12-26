// components/Input/index.jsx

import "./style.css";

const Input = ({ placeholder, label, eventoTeclado, onKeyDown, name, obj, type, maxLength }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onKeyDown) {
      // Se a tecla pressionada for Enter e houver uma função associada ao evento onKeyDown
      onKeyDown(e);
    }
  };

  return (
    <>
      <div className="form__group field">
        <input
          onChange={eventoTeclado}
          onKeyDown={handleKeyDown}
          name={name}
          type={type}
          className="form__field"
          placeholder={placeholder}
          required=""
          value={obj}
          maxLength={maxLength} 
        />
        <label htmlFor="name" className="form__label">
          {label}
        </label>
      </div>
    </>
  );
};

export default Input;
