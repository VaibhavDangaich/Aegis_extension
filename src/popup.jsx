import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Popup() {
  const [text, setText] = useState('Analyzing...');

  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setText(data.analysis.result || 'Done!!');
  };

  return (
    <div className="p-4 w-72">
      <textarea value={text} readOnly className="w-full h-40 p-2" />
      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Analyze
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Popup />);
