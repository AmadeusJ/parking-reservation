import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

// 개발 환경에서는 MSW를 사용하여 모킹 설정
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
