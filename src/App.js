import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
require('dotenv').config();


const apiKey = process.env.REACT_APP_GEN_AI_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log('----------------', apiKey);
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function App() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
  
    const generateContent = async (userPrompt) => {
      try {
        console.log('----------', userPrompt, typeof userPrompt);
        // Ensure userPrompt is a string
        if (typeof userPrompt !== 'string') {
          throw new Error('Prompt must be a string');
        }
  
        const res = await model.generateContent([userPrompt]);
        console.log('RESULT:', res);
        setResult(res.response.text());  // Ensure res.response.text() returns a string
      } catch (error) {
        console.error('Error generating content:', error);
        setResult('Error generating content. Please try again.');
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await generateContent(prompt);  // Pass prompt directly
    };
  
    const handleInputChange = (event) => {
      setPrompt(event.target.value);
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Generative AI Demo App</p>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={prompt}
              onChange={handleInputChange}
              placeholder='Enter your Prompt'
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Generate</button>
          </form>
  
          {result && (
            <div  style={styles.resultContainer}>
              <h2>Generated Content:</h2>
              <p>{result}</p>
            </div>
          )}
  
          <a
            className="App-link"
            href="https://github.com/google-gemini/generative-ai-js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Generative AI
          </a>
        </header>
      </div>
    );
  }
  
  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
    },
    input: {
      width: '100%',
      maxWidth: '500px',
      padding: '10px',
      fontSize: '16px',
      border: '2px solid #61dafb',
      borderRadius: '5px',
      outline: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '10px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    inputFocus: {
      borderColor: '#21a1f1',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#61dafb',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#21a1f1',
    },
    resultContainer: {
      marginTop: '20px',
      textAlign: 'center',
    },
  };

  export default App;
  