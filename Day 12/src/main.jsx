import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CardProvider from "./context/CardProvider";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <CardProvider>
      <App />
    </CardProvider>
  </StrictMode>,
)
