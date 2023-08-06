import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EntryContextProvider } from './context/entryContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EntryContextProvider>
      <App />
    </EntryContextProvider>
  </React.StrictMode>,
)
