import React, { useEffect, useState, useRef } from 'react';
import './App.css'; // Make sure to include your CSS files
import logo from './logo.svg'; // Import your logo image
import './styles.css';

function App() {
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [confetti, setConfetti] = useState(false); // State to trigger confetti animation

    const canvasRef = useRef(null);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const dots = [];
        const maxDots = Math.random()*900 + 100;

        // Create white dots
        for (let i = 0; i < maxDots; i++) {
            const radius = Math.random() * 3 + 1;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 2; // Random horizontal velocity
            const dy = (Math.random() - 0.5) * 2; // Random vertical velocity
            dots.push({ x, y, radius, dx, dy });
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dots.forEach((dot) => {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();

                // Move the dots
                dot.x += dot.dx;
                dot.y += dot.dy;

                // Bounce off the walls
                if (dot.x + dot.radius > canvas.width || dot.x - dot.radius < 0) {
                    dot.dx = -dot.dx;
                }
                if (dot.y + dot.radius > canvas.height || dot.y - dot.radius < 0) {
                    dot.dy = -dot.dy;
                }
            });
        }

        animate();
    }, [isDarkMode]);

    const addBotMessage = (message) => {
        setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { text: message, type: 'bot' },
        ]);
    };

    const addUserMessage = (message) => {
        setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { text: message, type: 'user' },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputText.trim();
        if (userMessage) {
            addUserMessage(userMessage);
            getBotResponse(userMessage);
            setInputText('');
            setConfetti(true); // Trigger confetti animation
            setTimeout(() => setConfetti(false), 2000); // Turn off confetti after 2 seconds
        }
    };

    const getBotResponse = (userMessage) => {
        const dataToSend = { inputText: userMessage };
        const queryParams = new URLSearchParams(dataToSend).toString();
        fetch(`http://localhost:8080/api/v1/getResponse?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.text();
                } else {
                    return response.text();
                }
            })
            .then((data) => {
                addBotMessage(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            />
            <div
                className={`chat-container ${isDarkMode ? 'dark-mode' : ''}`}
                style={{
                    background: isDarkMode ? '#333' : '#00d0ff',
                }}
            >
                <div className={`chat-header ${isDarkMode ? 'dark-mode' : ''}`}>
                    <img src={logo} alt="Your Logo" className="logo" /> {/* Display your logo */}
                    LocalLLM
                    <button className="dark-mode-button" onClick={toggleDarkMode}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
                {confetti && <div className="confetti"></div> /* Display confetti when triggered */}
                <div className="chat-messages">
                    {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${
                                message.type === 'bot' ? 'bot-message' : 'user-message'
                            }`}
                        >
                            <div
                                className={`message-content ${
                                    message.type === 'bot' ? 'bot-content' : 'user-content'
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        className="input-field" // Apply a CSS class for input
                    />
                    <button type="submit" className="send-button">
                        Send
                    </button>
                    {/* Apply a CSS class for the button */}
                </form>
            </div>
        </div>
    );
}

export default App;
