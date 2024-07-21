import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DisplayPage.css';  

function DisplayPage() {
    const { title, wordCount } = useParams();
    const [bookReview, setBookReview] = useState('');
    const [bookCover, setBookCover] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;  

    const fetchBookData = async () => {
        try {
            
            const response = await fetch(`${apiUrl}/api/books`, {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, wordCount }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch book data');
            }

            const data = await response.json();
            console.log('Received book data:', data);

            
            setBookReview(data.review);
            setBookCover(data.cover);
        } catch (error) {
            console.error('Error fetching book data:', error.message);
            
        }
    };

    useEffect(() => {
        fetchBookData(); 

        
    }, [title, wordCount]);  

    const handleCopyReview = () => {
     
        navigator.clipboard.writeText(bookReview);
    };

    const handleRegenerateResponse = () => {
  
        fetchBookData();
    };

    return (
        <div className="display-page">
            <div className="content">
                <div className="book-cover">
                    {bookCover && <img src={bookCover} alt="Book Cover" />}
                </div>
                <div className="book-details">
                    <p className="book-title">{title}</p>
                    <div className="buttons-container">
                        <button
                            className="buttond"
                            onClick={handleCopyReview}
                            disabled={!bookReview}
                        >
                            Copy Review
                        </button>
                        <button className="buttond" onClick={handleRegenerateResponse}>
                            Regenerate Response
                        </button>
                    </div>
                </div>
            </div>

            <p className="book-review">{bookReview || 'Loading...'}</p>
        </div>
    );
}

export default DisplayPage;
