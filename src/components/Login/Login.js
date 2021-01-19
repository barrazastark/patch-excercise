import { useState } from "react";
import {useHistory} from "react-router-dom";

import { Button } from "../../UIElements";

import "./styles.scss";

const blockName = "login-wrapper";

const Login = () => {
    const history = useHistory();
    const [isUser, setIsUser] = useState(false);

    const handleClick = () => setIsUser(true);

    const handleClickAdmin = () => {
        history.push('/management')
    }

    const handleChangeUser = e => {
        if(e.target.value) {
            history.push('/library', { user: e.target.value });
        }
    }

    return (
        <div className={blockName}>
            <h1>Library APP</h1>
            <Button 
                className={`${blockName}__button`}
                onClick={handleClickAdmin}
            >
                Login as librarian
            </Button>
            <Button
                onClick={handleClick}
                className={`${blockName}__button ${isUser ? `${blockName}__button--active` : ''}`}
            >
                    Login as user
            </Button>
            {isUser && (
                <label>
                    <span>Select user</span>
                    <select onChange={handleChangeUser}>
                        <option />
                        <option value="user1">user1</option>
                        <option value="user2">user2</option>
                        <option value="user3">user3</option>
                    </select>
                </label>
            )}
        </div>
    );
}
export default Login;