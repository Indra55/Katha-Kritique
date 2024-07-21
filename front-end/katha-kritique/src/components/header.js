 
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; 

function Header() {
    return (
        <header>
            <nav>
                <Link to="/" className="header-link">katha kritique</Link>
            </nav>
        </header>
    );
}

export default Header;
