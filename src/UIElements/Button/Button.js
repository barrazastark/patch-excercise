import PropTypes from "prop-types"
import "./styles.scss";

const blockName = "button-wrapper";

const Button = ({ children, onClick, className }) => {
    return (
        <button 
            className={`${blockName} ${className}`}
            onClick={onClick}
        >
                {children}
        </button>
    )
}

Button.defaultProps = {
    className: "",
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Button;