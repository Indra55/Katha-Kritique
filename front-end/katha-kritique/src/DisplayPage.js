import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DisplayPage.css'; // Import your CSS file

function DisplayPage() {
    const { title, wordCount } = useParams();
    const [bookReview, setBookReview] = useState('');
    const [bookCover, setBookCover] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variable

    const fetchBookData = async () => {
        try {
            // Fetch book data including review and cover
            const response = await fetch(`${apiUrl}/api/books`, { // Use API URL from environment variable
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

            // Update state with book review and cover
            setBookReview(data.review);
            setBookCover(data.cover);
        } catch (error) {
            console.error('Error fetching book data:', error.message);
            // Optionally handle error state or display a message to the user
        }
    };

    useEffect(() => {
        fetchBookData(); // Call the fetchBookData function here

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, wordCount]); // Ensure to include title and wordCount as dependencies if they are used in fetchBookData

    const handleCopyReview = () => {
        // Function to copy the review to the clipboard
        navigator.clipboard.writeText(bookReview);
    };

    const handleRegenerateResponse = () => {
        // Function to regenerate the response (fetch book data again)
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
