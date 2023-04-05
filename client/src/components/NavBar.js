import {NavLink} from 'react-router-dom';

function NavBar() {
    return (
        <header>
            <nav>
            <div className="navigation">
                <NavLink className="button" exact to="/login">Login</NavLink>
            </div>
            </nav>
        </header>
        );
    }
    
    export default NavBar;