import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header';
import Menu from './components/menu';
import './App.css';
import Page1 from './page1';
import Page2 from './page2'; 
import DisplayPage from './DisplayPage';

function Home() {
    return (
        <div className='body'>
            <p id="homepage-desc">
                Welcome to katha kritique, where the magic of literature comes alive. Our AI-powered platform delves into the heart of every book, providing you with enchanting reviews that capture the essence of each story. Whether you're a curious reader seeking your next adventure or a seasoned bibliophile on a quest for hidden gems, our reviews are designed to inspire and guide you. Let the words of our reviews transport you to fantastical worlds and unforgettable narratives, making every visit to Book Haven a journey through the wonders of literature. Explore, discover, and let the magic of books enchant you.
            </p>
            <div className="button-container">
                <Link id="start" to="/page1">Get Started</Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/page1" element={<Page1 />} />
                   
                <Route path="/page2/:title" element={<Page2 />} />
                <Route path="/DisplayPage/:title/:wordCount" element={<DisplayPage />} />
                    {}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
