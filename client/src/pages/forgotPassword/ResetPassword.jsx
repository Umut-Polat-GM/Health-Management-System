import { useState, useEffect } from 'react';

// import { Link } from 'react-router-dom';
import AuthBackground from '../../assets/image/auth/AuthBackGround';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword,reset } from '../../store/features/auth/authSlice';
import Spinner from '../../components/Spinner';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const ResetPassword = () => {

  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState('');


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
    setPassword(e.target.value);
  };

  const validationSchema = yup.object().shape({
    password: yup.string().required('Şifre alanı boş bırakılamaz').min(6, 'Şifre en az 6 karakter olmalıdır')
  });

  const onSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(password, { abortEarly: false })
      .then(() => {
        // console.log(userData)
        dispatch(resetPassword(password));

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
              label='Password'
              name='password'
              value={password}
              onChange={handleChange}
              placeholder='Enter password'
              type='password'
              fullWidth
              required
            />
            {errors.password && <Typography color="error">{errors.password}</Typography>}


            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
              Password Reset
            </Button>
            <Typography sx={{ marginTop: '1rem' }}>
              <Link href="/login">
                Login Ekranına Dön
              </Link>
            </Typography>
          </Paper>

        </form>
      </Grid>
    </>
  );
};


export default ResetPassword;
