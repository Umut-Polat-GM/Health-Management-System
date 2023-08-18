import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../store/features/auth/authSlice';
import Spinner from '../Spinner';
import * as yup from 'yup';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link
} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from '../Navbar';
import AuthBackground from '../../assets/image/auth/AuthBackGround';



const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ""
  });

  
  const { email, password, username } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  console.log(isLoading)

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
    username: yup.string().required('Kullanıcı adı alanı boş bırakılamaz'),
    email: yup.string().email('Geçersiz e-posta').required('E-posta alanı boş bırakılamaz'),
    password: yup.string().required('Şifre alanı boş bırakılamaz'),
  });

  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        const userData = {
          username,
          email,
          password,
        };
        dispatch(register(userData));
        navigate(`/user/email-verify/${email}`);
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

  const paperStyle = { padding: 20, height: 'auto', width: "90%", maxWidth: 450, margin: "50px auto" }; // responsive stil düzenlemeleri
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };

  return (
    <>
      <Navbar />
      <AuthBackground />
      <Grid container justifyContent="center" alignItems="center">
        <form onSubmit={onSubmit}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <h2>Sign Up</h2>
            </Grid>
            <TextField
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              label='UserName'
              name='username'
              value={username}
              onChange={onChange}
              placeholder='Enter email'
              fullWidth
              required
            />
            {errors.username && <Typography color="error">{errors.username}</Typography>}
            <TextField
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
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
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
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

          
            {/* dosya yukleme kısmı<TextField
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              
              name='username'
              value={username}
              onChange={onChange}
              placeholder='Enter email'
              fullWidth
              required
              type='file'

            /> */}

            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            <Typography>
              <Link href="#">
                Forgot password ?
              </Link>
            </Typography>
            <Typography>
              Do you have an account ?
              <Link href="#">
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </form>
      </Grid>


    </>
  );
}

export default Register;
