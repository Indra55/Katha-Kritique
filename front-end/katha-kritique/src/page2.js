import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Quote from './components/quotes.js'; // Import the Quote component
import './page2.css';

const Page2 = () => {
    const navigate = useNavigate();
    const { title } = useParams(); // Retrieve title from URL params
    const [selectedWordCount, setSelectedWordCount] = useState(0);

    const handleButtonClick = (wordCount) => {
        setSelectedWordCount(wordCount);
        navigate(`/DisplayPage/${title}/${wordCount}`);
    };

    return (
        <div>
            <h1 className='words'>Cast The Word Count</h1>
            <div className="button-container">
                <div className="container">
                    <div className="button" onClick={() => handleButtonClick(100)}>
                        <div className="button__content">
                            <span className="button__text">100</span>
                            <div className="button__shape-1"></div>
                            <div className="button__shape-2"></div>
                            <div className="button__shape-3"></div>
                            <div className="button__shape-4"></div>
                        </div>
                        <div className="button__shadow"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="button" onClick={() => handleButtonClick(250)}>
                        <div className="button__content">
                            <span className="button__text">250</span>
                            <div className="button__shape-1 button__shape-1--blue"></div>
                            <div className="button__shape-2 button__shape-2--purple"></div>
                            <div className="button__shape-3 button__shape-3--green"></div>
                            <div className="button__shape-4 button__shape-4--yellow"></div>
                        </div>
                        <div className="button__shadow"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="button" onClick={() => handleButtonClick(500)}>
                        <div className="button__content">
                            <span className="button__text">500</span>
                            <div className="button__shape-1 button__shape-1--purple"></div>
                            <div className="button__shape-2 button__shape-2--green"></div>
                            <div className="button__shape-3 button__shape-3--yellow"></div>
                            <div className="button__shape-4 button__shape-4--blue"></div>
                        </div>
                        <div className="button__shadow"></div>
                    </div>
                </div>
            </div>
            <Quote /> {/* Render the Quote component here */}
        </div>
    );
}

export default Page2;
