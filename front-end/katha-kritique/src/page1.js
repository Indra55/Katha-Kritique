import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quote from './components/quotes.js';  
import './page1.css';

function Page1() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const handleInputChange = (event) => {
        setTitle(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleButtonClick = () => {
        handleSubmit();
    };

    const handleSubmit = () => {
        if (title.trim() !== '') {
            navigate(`/page2/${title}`);  
        } else {
            console.warn('Please enter a valid book title.');
        }
    };

    return (
        <div className='body_page1'>
            <input
                type="text"
                id="myInput"
                placeholder="Unveil The Title"
                value={title}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <div className="button-container">
                <button className="page1-button" onClick={handleButtonClick}></button>
            </div>
            <Quote /> { }
        </div>
    );
}

export default Page1;
