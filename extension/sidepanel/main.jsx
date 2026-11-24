import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/global.css';

// Detect whether we are running in an actual extension container or in dev browser tab
const isExtensionContext = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

function Root() {
  if (isExtensionContext) {
    return (
      <div className="extension-sidepanel-root">
        <App />
      </div>
    );
  }

  // Standalone dev preview: 400px centered column
  return (
    <div className="standalone-preview-wrap">
      <div className="standalone-preview-frame">
        <App />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
