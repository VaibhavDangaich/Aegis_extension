import React, { useState } from 'react';

const Popup = () => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeCurrentTab = async () => {
    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentTabUrl = tab.url;

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: currentTabUrl }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.result) {
        setAnalysis(data.result);
      } else {
        throw new Error("No 'result' field in server response");
      }
    } catch (err) {
      console.error("Error during analysis:", err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-72 font-sans">
      <h1 className="text-lg font-semibold mb-2">AegisAI - Privacy Policy Analyzer</h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={analyzeCurrentTab}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze this Page'}
      </button>

      {error && (
        <p className="text-red-600 mt-2 text-sm">❌ {error}</p>
      )}

      {analysis && (
        <div className="mt-4 text-sm text-gray-800">
          <h2 className="font-medium mb-1">Analysis Result:</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default Popup;
