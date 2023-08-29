import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { UserProvider } from './context/UserContext.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />  
    </UserProvider>
  </React.StrictMode>,
)
