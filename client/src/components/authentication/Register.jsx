import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../store/features/auth/authSlice';
import Spinner from '../Spinner';
import * as yup from 'yup';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  
} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from '../Navbar';
import AuthBackground from '../../assets/image/auth/AuthBackGround';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username:"",
    isDoctor:false
  });

  const { email, password, username, isDoctor } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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
    password: yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Şifre en az 8 karakter uzunluğunda, en az bir küçük harf, bir büyük harf, bir sayı ve bir özel karakter içermelidir.'
    ).required('Şifre alanı boş bırakılamaz'),
  });

  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        const userData = {
          email,
          password,
        };
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

  const paperStyle = { padding: 20, height: '70vh', width: 450, margin: "50px auto" };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };
  
  return (
    <>
      <Navbar />
      <Grid>
        <AuthBackground />
        <form onSubmit={onSubmit}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <h2>Sign Up</h2>
            </Grid>
            <TextField
              sx={{ marginTop: "2.5rem" }}
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
              sx={{ marginTop: "8px" }}
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
              sx={{ marginTop: "8px" }}
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
          

            {/* Radio button for isDoctor */}
            <FormControl sx={{marginTop:"5px"}} component="fieldset">
              <FormLabel component="legend">Are you a doctor?</FormLabel>
              <RadioGroup row aria-label="isDoctor" name="isDoctor" value={isDoctor.toString()} onChange={onChange}>
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

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

export default Login;
