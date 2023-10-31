import "./style.css";

import { Link } from 'react-router-dom';
const LinkButton = ({nome, link }) => {
    return (
        <>
            <button type="button" className="cta-link">
            <Link to={link} ><span className="hover-underline-animation"> {nome} </span></Link>
            </button>

        </>
    );
};

export default LinkButton;