import React, { useState } from 'react';
import './menu.css';

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="menu-container">
            <button className='hamburger-menu' onClick={toggleMenu}>
               
            </button>
            {menuOpen && (
                <div className="overlay-menu">
                    <ul>
                        <li><a href="mailto:galahitanshu@gmail.com">Email</a></li>
                        <li><a href="https://www.linkedin.com/in/hitanshu-gala-9a14b0155/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <li><a href="https://github.com/Indra55" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Menu;
