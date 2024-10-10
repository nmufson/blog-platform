import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StrictMode } from 'react';
import '../../shared/styles/index.css';
import { MyContextProvider } from '../../shared/Context/MyContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </StrictMode>,
);
