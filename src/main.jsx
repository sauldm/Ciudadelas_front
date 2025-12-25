import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './services/webSocket/socketProvider.jsx'
import AppShell from './components/appShell.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <AppShell>
        <App />
      </AppShell>
    </SocketProvider>
  </React.StrictMode>


)
