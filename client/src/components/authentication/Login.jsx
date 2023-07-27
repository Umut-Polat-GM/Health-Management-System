import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Navbar from '../Navbar';
import AuthBackground from '../../assets/image/auth/AuthBackGround';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../store/features/auth/authSlice'
import Spinner from '../Spinner'
import * as yup from 'yup';


const Login=()=>{

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
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
        dispatch(login(userData));
      })
      .catch((error) => {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        // Handle form errors if needed
      });
  };

  if (isLoading) {
    return <Spinner />
  }
    const paperStyle={padding :20,height:'60vh',width:450, margin:"100px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
      <><Navbar/>
      <Grid>
        <AuthBackground/>
        <form onSubmit={onSubmit}>
          <Paper elevation={10} style={paperStyle} >
              <Grid align='center'>
                   <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                  <h2>Sign In</h2>
              </Grid>
              <TextField sx={{marginTop:"2.5rem"}} label='Email' name='email' value={email} onChange={onChange} placeholder='Enter email' fullWidth required/>
              <TextField sx={{marginTop:"7px"}} label='Password'name='password' value={password} onChange={onChange} placeholder='Enter password' type='password' fullWidth required/>
              <FormControlLabel
                  control={
                  <Checkbox
                      name="checkedB"
                      color="primary"
                  />
                  }
                  label="Remember me"
               />
              <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
              <Typography >
                   <Link href="#" >
                      Forgot password ?
              </Link>
              </Typography>
              <Typography > Do you have an account ?
                   <Link href="#" >
                      Sign Up 
              </Link>
              </Typography>
          </Paper>
          </form>
      </Grid></>
    )
}

export default Login