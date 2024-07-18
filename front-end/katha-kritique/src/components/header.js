// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Ensure the correct path to the CSS file

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
