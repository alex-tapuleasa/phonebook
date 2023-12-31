import React, {useState, useContext} from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Alert from '@mui/material/Alert';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../../context/UserContext';

const validationSchema = yup.object({
  username: yup
    .string('Enter Username')
    .required('Username is required'),
  password: yup
  .string('Enter Password')
  .min(6, 'Password should be minimum 6 caracters')
  .required('Password is required')
});

const Register = () => {

    const [userContext, setUserContext] = useContext(UserContext);
  
    const [error, setError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState()
  
    let navigate = useNavigate();
      
     const registerUser = async (values) => {
  
      const {username, password} = values;
  
      try {
        const {data} = await axios.post('/api/auth/register', {username, password});
        
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
  
        setSignUpSuccess(data.message);
        setTimeout(() => {
         
           navigate(`/${data.user._id}/contacts`)
        }, 700)
  
      } catch (error) {
        setError(error.response.data.error); 
        setSignUpSuccess('');
        setTimeout(() => {
          setError('')
        }, 5000)
  
        
      }
          
     }

     const formik = useFormik({
      initialValues: {username: '', password: ''},
      validateOnBlur: true,
      validationSchema: validationSchema,
      onSubmit: registerUser
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={formik.values.username}
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >Sign up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
          </Box>
  )
}

export default Register