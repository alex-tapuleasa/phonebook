import React, {useContext, useCallback, useEffect} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import axios from 'axios';
import { UserContext } from './context/UserContext.jsx';


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

export default function App() {

  const [userContext, setUserContext] = useContext(UserContext);


// ==============================================

  const fetchUserDetails = useCallback(async () => {
   // const config = {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${userContext.token}`,
    //       }
    // }

    const res = await axios.get('/api/users/me', {headers: {
      "Authorization": `Bearer ${userContext.token}`,
    }});
    
            setUserContext(oldValues => {
                return { ...oldValues, details: res.data };
            })
           

}, [setUserContext, userContext.token]); 

  useEffect(() => {
    
    // fetch only when user details are not present  
        if(!userContext.token) 
        return;                 
        if (!userContext.details) {
             fetchUserDetails()
             return () => {
             }
            }
        console.log("user details use effect")
  }, [userContext.details, userContext.token, fetchUserDetails])


  const verifyUser = useCallback(async () => {
    // if(!userContext.token) return;
  
     const res = await axios.post('/api/auth/refreshtoken', {headers: {
      "Authorization": `Bearer ${userContext.token}`
    }});
      
    //  if(res.statusText === 'OK') {
       setUserContext(oldValues => {
         return{...oldValues, token: res.data.token}
         
       })
    //  } else {
    //    setUserContext(oldValues => {
    //      return{...oldValues, token: null}
    //    })
    //  }
    
      // call refreshToken every 10 minutes to renew the authentication token.
      setTimeout(verifyUser, 10 * 60 * 1000)
  },[setUserContext]);

  useEffect(() => {
    verifyUser();
    console.log("use effect verify user")
 
  }, [verifyUser]);

  return (
    <RouterProvider router = {router} />  
  )
} 
