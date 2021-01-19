import PropTypes from "prop-types";
import "./styles.scss";

const blockName = "table-wrapper";

const Table = ({ data, headers, action, onClickAction, deletingItem }) => {
    return (
        <table className={blockName}>
            <thead>
                <tr>
                    {headers.map(head => (
                        <th key={head.field}>{head.display}</th>
                    ))}
                    {action ? <th /> : null}
                </tr>
            </thead>
            <tbody>
                {data.map(_data => (
                    <tr key={_data.id}>
                        {headers.map(({ field }) => (
                            <td key={_data.id+_data[field]}>{_data[field]}</td>
                        ))}
                       {action ? 
                        <td>
                            <button 
                                disabled={Boolean(deletingItem)} 
                                onClick={() => onClickAction(_data.id)}
                                className={deletingItem === _data.id ? 'removed' : ''}
                            >
                                {deletingItem === _data.id ? 'removing' : action}
                            </button>                           
                        </td> 
                        : null}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.defaultProps = {
    action: '',
    onClickAction: () => {},
    deletingItem: null,
}

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape({
        field: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    action: PropTypes.string,
    onClickAction: PropTypes.func,
    deletingItem: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
}

export default Table;