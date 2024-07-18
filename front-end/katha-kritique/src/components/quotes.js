import React, { useState, useEffect } from 'react';
import './quotes.css';

const Quote = () => {
    const [quotes, setQuotes] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        fetchRandomQuotes(); // Initial fetch of quotes
        const interval = setInterval(fetchRandomQuotes, 10000); // Fetch quotes every 10 seconds
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    const fetchRandomQuotes = () => {
        fetch('https://api.quotable.io/quotes/random?limit=50') // Fetching 5 random quotes
            .then(response => response.json())
            .then(data => {
                setQuotes(data);
                setCurrentQuoteIndex(0); // Reset current index to display first quote
            })
            .catch(error => console.error('Error fetching quotes:', error));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
        }, 10000); // Change quote index every 10 seconds
        return () => clearInterval(interval); // Clean up interval on component unmount
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
