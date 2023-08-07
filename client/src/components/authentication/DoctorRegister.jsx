import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doctorRegister, reset } from '../../store/features/auth/authSlice';
import Spinner from '../Spinner';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from '../Navbar';
import AuthBackground from '../../assets/image/auth/AuthBackGround';
import getAllSpecialization from '../../services/getAllService';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // email: '',
    // password: '',
    firstName: "",
    lastName: "",
    phone: "",
    specializationId: "",//category yi biz belirleyelim buradan listeletip seçtirelim
    status: "pending",
    userId: null,
    // img: ""
  });

  const [data, setData] = useState([])
  const [errors, setErrors] = useState({});

  const { firstName, lastName, phone, specializationId, status } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const fetchSpecializations = async () => {
    try {
      const response = await getAllSpecialization();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSpecializations()
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // if (isSuccess || user) {
    //   navigate('/');
    // }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  const validationSchema = yup.object().shape({
    firstName: yup.string().required('firstname adı alanı boş bırakılamaz'),
    lastName: yup.string().required('lastname adı alanı boş bırakılamaz'),
    // email: yup.string().email('Geçersiz e-posta').required('E-posta alanı boş bırakılamaz'),
   // password: yup.string().required('Şifre alanı boş bırakılamaz'),
    phone: yup.string().required('Telefon alanı boş bırakılamaz'),
    specializationId: yup.string().required('Uzmanlık alanı boş bırakılamaz')
    // img: yup.mixed().required('Dosya alanı boş bırakılamaz')
  });


  const onSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        const userData = {
            firstName, lastName, phone, specializationId, status, userId: null,
        };
        console.log(userData);
        dispatch(doctorRegister(userData));
      })
      .catch((error) => {
        console.log(error);
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
              sx={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
              label='FistName'
              name='firstName'
              value={firstName}
              onChange={onChange}
              placeholder='Enter FirstName'
              fullWidth
              required
            />
            {errors.firstName && <Typography color="error">{errors.firstName}</Typography>}

            <TextField
              sx={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
              label='LastName'
              name='lastName'
              value={lastName}
              onChange={onChange}
              placeholder='Enter LastName'
              fullWidth
              required
            />
            {errors.lastName && <Typography color="error">{errors.lastName}</Typography>}

            {/* <TextField
              sx={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
              label='Email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter email'
              fullWidth
              required
            />
            {errors.email && <Typography color="error">{errors.email}</Typography>} */}

            {/* <TextField
              sx={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
              label='Password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              type='password'
              fullWidth
              required
            />
            {errors.password && <Typography color="error">{errors.password}</Typography>} */}

            <InputMask
              mask="(999)999-9999"
              value={phone}
              onChange={onChange}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                  label="Telefon Numarası"
                  variant="outlined"
                  name='phone'
                  value={phone}
                  onChange={onChange}
                  placeholder='Enter phone'
                  fullWidth
                />
              )}
            </InputMask>
            {errors.phone && <Typography color="error">{errors.phone}</Typography>}

            <FormControl fullWidth>
              <InputLabel >Uzmanlık</InputLabel>
              <Select
                value={specializationId}
                label="Uzmanlık"
                name="specializationId"
                onChange={onChange}
              >
                {data.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
            {errors.specializId && <Typography color="error">{errors.specializId}</Typography>}


            {/* <TextField
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              name='img'
              value={img}
              onChange={onChange}
              placeholder='Upload File'
              fullWidth
              required
              type='file'
              accept='.jpg, .jpeg, .png, .gif, .pdf'
            />
            {errors.img && <Typography color="error">{errors.img}</Typography>} */}


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


export default DoctorRegister;
