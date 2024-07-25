import React, { useState, useEffect } from 'react';
import './quotes.css';

const Quote = () => {
    const [quotes, setQuotes] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const fetchRandomQuotes = async () => {
            try {
                const response = await fetch('https://api.quotable.io/quotes/random?limit=50');
                const data = await response.json();
                setQuotes(data);
                setCurrentQuoteIndex(0);
            } catch (error) {
                console.error('Error fetching quotes:', error);
            }
        };

        fetchRandomQuotes();
        const fetchInterval = setInterval(fetchRandomQuotes, 10000);
        return () => clearInterval(fetchInterval);
    }, []);

    useEffect(() => {
        const quoteChangeInterval = setInterval(() => {
            setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
        }, 10000);
        return () => clearInterval(quoteChangeInterval);
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
