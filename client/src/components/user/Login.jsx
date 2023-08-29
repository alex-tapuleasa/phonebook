import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
  username: yup
    .string('Enter Username')
    .required('Username is required'),
  password: yup
  .string('Enter Password')
  .required('Password is required')
});

const Login = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const loginUser = async (values) => {

    const {username, password} = values;

    try {
      const { data } = await axios.post('/api/auth/login', {username, password});

      setUserContext(oldValues => {
        return { ...oldValues, token: data.token, details: data.user}
      })

      setTimeout(() => {
         
        navigate(`/${data.user._id}/contacts`)
     }, 700)

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const formik = useFormik({
    initialValues: {username: '', password: ''},
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: loginUser
  });


  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formik.values.email}
              autoComplete="username"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formik.values.password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
            </Grid>
    </Box>
  )
}

export default Login