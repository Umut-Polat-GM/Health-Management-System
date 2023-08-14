import { useState, useEffect } from 'react';

// import { Link } from 'react-router-dom';
import AuthBackground from '../../assets/image/auth/AuthBackGround';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { forgotPassword, reset } from '../../store/features/auth/authSlice';
import Spinner from '../../components/Spinner';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const ForgotPassword = () => {
  
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');


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

  const handleChange = (e) => {
    setEmail( e.target.value);
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Geçersiz e-posta').required('E-posta alanı boş bırakılamaz'),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(email, { abortEarly: false })
      .then(() => {
        // console.log(userData)
        dispatch(forgotPassword(email));

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
    <>
     <AuthBackground />
      <Grid container justifyContent="center">
        <form onSubmit={onSubmit}>

          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockResetIcon /></Avatar>
              <h2>Forgot Password</h2>
            </Grid>
            <TextField
              sx={{ marginTop: '1rem' }}
              label='Email'
              name='email'
              value={email}
              onChange={handleChange}
              placeholder='Enter email'
              fullWidth
              required
            />
            {errors.email && <Typography color="error">{errors.email}</Typography>}
            
           
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
              Password Reset
            </Button>
            <Typography sx={{ marginTop: '1rem' }}>
              <Link href="/login">
                Login Ekranına Dön
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
      </Grid>
    </>
  );
};


export default ForgotPassword;
