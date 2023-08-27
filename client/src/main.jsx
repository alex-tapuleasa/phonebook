import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserProvider } from './context/UserContext.jsx';
import App from './App.jsx'
import AddContact from './components/contacts/AddContact.jsx';
import ContactDetails from './components/contacts/ContactDetails.jsx';
import ContactsList from './components/contacts/ContactsList.jsx';
import Login from './components/user/Login.jsx'
import Register from './components/user/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome!</div>,
  },
  {
    path: "/:id/new",
    element: <AddContact />
  },
  {
    path: "/:id/contacts/:contactId",
    element: <ContactDetails />
  },
  {
    path: "/:id/contacts",
    element: <ContactsList />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
