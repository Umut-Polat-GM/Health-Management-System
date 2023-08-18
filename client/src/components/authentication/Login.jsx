import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Navbar from '../Navbar';
import AuthBackground from '../../assets/image/auth/AuthBackGround';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../store/features/auth/authSlice';
import Spinner from '../Spinner';
import * as yup from 'yup';



const Login = () => {

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  console.log(user)
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Geçersiz e-posta').required('E-posta alanı boş bırakılamaz'),
    password: yup.string().required('Şifre alanı boş bırakılamaz').min(6, 'Şifre en az 6 karakter olmalıdır')
  });

  const onSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        const userData = {
          email,
          password,
        };
        // console.log(userData)
        dispatch(login(userData));
      })
      .catch((error) => {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  const paperStyle = { padding: 20, height: 'auto', width: '90%', maxWidth: 400, margin: '5rem auto' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };

  return (
    <><Navbar/>
     {isLoading ? <Spinner /> : <> <AuthBackground />
      <Grid container justifyContent="center">
        <form onSubmit={onSubmit}>

          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockResetIcon /></Avatar>
              <h2></h2>
            </Grid>
            <TextField
              sx={{ marginTop: '1rem' }}
              label='Email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter email'
              fullWidth
              required
            />
            {errors.email && <Typography color="error">{errors.email}</Typography>}
            <TextField
              sx={{ marginTop: '1rem' }}
              label='Password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              type='password'
              fullWidth
              required
            />
            {errors.password && <Typography color="error">{errors.password}</Typography>}
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
              sx={{ marginTop: '1rem' }}
            />
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
              Sign Up
            </Button>
            <Typography sx={{ marginTop: '1rem' }}>
              <Link href="/user/forgot-password">
                Forgot password?
              </Link>
            </Typography>
            <Typography sx={{ marginTop: '1rem' }}>
              Do you have an account?
              <Link href="/register">
                Sign In
              </Link>
            </Typography>
          </Paper>

        </form>
      </Grid></>}
      
    </>
  );
}

export default Login;
