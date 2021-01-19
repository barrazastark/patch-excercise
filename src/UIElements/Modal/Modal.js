import PropTypes from "prop-types";
import "./styles.scss";

const blockName = "modal-wrapper";

const Modal = ({ children, header, show, onClose, onAccept, isValid }) => {

    if(!show) {
        return null;
    }

    return (
        <div className={blockName} onClick={onClose}>
            <div className={`${blockName}__content`} onClick={e => e.stopPropagation()}>
                <h3>{header}</h3>
                <div className={`${blockName}__body`}>
                    {children}
                </div>
                <div className={`${blockName}__footer`}>
                    <button onClick={onClose}>Close</button>
                    <button disabled={!isValid} onClick={onAccept}>Save</button>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
}

export default Modal;