import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { queryClient } from './api/reservation';
import App from './App';
import { GlobalPortalProvider } from './components/Module/GlobalPortal';
import './index.css';
import store from './store';
// 개발 환경에서는 MSW를 사용하여 모킹 설정
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalPortalProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </GlobalPortalProvider>
  </React.StrictMode>
);
