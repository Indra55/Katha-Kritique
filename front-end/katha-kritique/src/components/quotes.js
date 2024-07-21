import React, { useState, useEffect } from 'react';
import './quotes.css';

const Quote = () => {
    const [quotes, setQuotes] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        fetchRandomQuotes(); 
        const interval = setInterval(fetchRandomQuotes, 10000); 
        return () => clearInterval(interval); 
    }, []);

    const fetchRandomQuotes = () => {
        fetch('https://api.quotable.io/quotes/random?limit=50') 
            .then(response => response.json())
            .then(data => {
                setQuotes(data);
                setCurrentQuoteIndex(0);
            })
            .catch(error => console.error('Error fetching quotes:', error));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
        }, 10000); 
        return () => clearInterval(interval); 
    }, [quotes]);

    return (
        <div className="quotes-container">
            {quotes.length > 0 && (
                <div className="quote">
                    <p>{quotes[currentQuoteIndex].content}</p>
                    <footer className="quote-footer">— {quotes[currentQuoteIndex].author}</footer>
                </div>
            )}
        </div>
    );
};

export default Quote;
