import React from "react";
import "./style.css";
import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
            <Link to={'/'}>
                {/*<img src={logo} className="logo" alt="logo" />*/}
                <div className="logo">Next | Movies</div>
            </Link>
        </header>
    );
}

export default Header;
