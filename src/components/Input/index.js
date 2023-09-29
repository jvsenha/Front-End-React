import "./style.css";


const Input = ({placeholder,label}) => {
  return (
    <>
    <div className="form__group field">
    <input type="input" className="form__field" placeholder={placeholder} required="" />
    <label for="name" className="form__label">{label}</label>
</div>
    </>
  );
};

export default Input;