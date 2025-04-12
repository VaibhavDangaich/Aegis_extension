import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.css';

function Popup() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyzeClick = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tab.url;

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.analysis.result);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      console.error('Popup Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <h2>AegisAI 🛡️</h2>
      <button onClick={handleAnalyzeClick} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Privacy Policy'}
      </button>

      {result && (
        <div className="result">
          <h3>Analysis Result:</h3>
          <p>{result}</p>
        </div>
      )}

      {error && <p className="error">❌ {error}</p>}
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));
