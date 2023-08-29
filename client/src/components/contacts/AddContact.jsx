import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../../context/UserContext';

// const styles = {
//     main: {
//       padding: '32px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'rgb(6, 122, 184)',
//       backgroundColor: 'white',
//       boxShadow: '5px 5px 20px -4px #EACDF2'
  
//     },
//     sloganText: {
//       padding: '40px',
//       color: '3C4257',
//       textAlign: 'center',
//       fontSize: '24px',
//       fontWeight: 'bold',
//       marginTop: '30px'
//     },
// }

const validationSchema = yup.object().shape({
    name: yup
      .string('Enter Contact Name')
      .required('Name is required'),
    phone: yup
      .string('Enter phone number')
      .required('Phone number is required'),
    email: yup
    .string('Enter email'),
    // .required('Email is required')
    city: yup
    .string('Enter city'),
    // .required('City is required'),   
  });

const AddContact = (props) => {
    const [userContext, setUserContext] = useContext(UserContext);
    const {id} = props
    const onSubmit = async (values) => {

        const {name, phone, email, city, id} = values;
    
        
        // const formData = new FormData();
        //     formData.append('name', name);
        //     formData.append('phone', phone);
        //     formData.append('email', email);
        //     formData.append('city', city);

        // useEffect(() => {
        //   // POST request using fetch inside useEffect React hook
        //   const requestOptions = {
        //       method: 'POST',
        //       headers: { 'Content-Type': 'application/json' },
        //       // body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        //   };
        //   fetch('https://localhost:5000/contacts/new', { name: name, phone: phone, email: email, city: city}, requestOptions)
        //       .then(response => response.json())
        //       // .then(data => setPostId(data.id));
        
        await axios.post(`/${id}/contacts/new`, { name, phone, email, city }, { headers: {
            "Authorization": `Bearer ${userContext.token}`, 
            "Content-Type": "application/json"
            
          }} )
          
          
      }
      

    const formik = useFormik({
        initialValues: {name: '', phone: '', email: '', city: ''},
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit
    });
            

  return (
    <form
        noValidate
        onSubmit={formik.handleSubmit}
        >
        <Box
            // className={classes.main}
            sx={{
              width: {sm:'80%', md:'50%', lg: '40%', xl:'30%'}, 
              margin: {xs: '5rem auto', sm: '7rem auto', lg: '12rem auto', xl:'12rem auto'},
              borderRadius: {xs: '4%', lg:'7%'}
            }}
        >
            <TextField
                fullWidth
                sx={{mt:'32px'}}
                variant='outlined'
                label='Contact Name'
                name='name'
                value={formik.values.name}
                placeholder='Enter Contact Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                />
            <TextField
                fullWidth
                // className={classes.inputField}
                variant='outlined'
                sx={{mt:'32px',}}
                label='Phone Number'
                name='phone'
                value={formik.values.phone}
                placeholder='Enter phone'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                />
            <TextField
                sx={{mt:'32px'}}
                fullWidth
                // className={classes.inputField}
                variant='outlined'
                label='Email'
                name='email'
                value={formik.values.email}
                placeholder='Enter Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
            <TextField
                sx={{mt:'32px'}}
                fullWidth
                // className={classes.inputField}
                variant='outlined'
                label='City'
                name='city'
                value={formik.values.city}
                placeholder='Enter city'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                />

            <Button
                sx={{mt:'32px'}}
                fullWidth
                variant='contained'
                type='submit'>Add Contact
            </Button>
        </Box>
    </form>
  )
}

export default AddContact