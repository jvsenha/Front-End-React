import "./style.css";


const Input = ({placeholder,label, eventoTeclado, name}) => {
  return (
    <>
    <div className="form__group field">
    <input onChange={eventoTeclado} name={name} type="input" className="form__field" placeholder={placeholder} required="" />
    <label for="name" className="form__label ">{label}</label>
</div>
    </>
  );
};

export default Input;