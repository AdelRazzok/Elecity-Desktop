import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthProvider'
import App from './App'

const root = createRoot(document.getElementById('root')!)

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
)