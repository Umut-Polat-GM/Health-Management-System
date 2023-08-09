// import  { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const VerifyPage = () => {
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
// //   const { isLoading } = useGlobalContext();
//   const query = useQuery();

//   const verifyToken = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post('/api/v1/auth/verify-email', {
//         verificationToken: query.get('token'),
//         email: query.get('email'),
//       });
//     } catch (error) {
//       // console.log(error.response);
//       setError(true);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (!isLoading) {
//       verifyToken();
//     }
//   }, []);

//   if (loading) {
//     return (
//       <Wrapper className='page'>
//         <h2>Loading...</h2>
//       </Wrapper>
//     );
//   }

//   if (error) {
//     return (
//       <Wrapper className='page'>
//         <h4>There was an error, please double check your verification link </h4>
//       </Wrapper>
//     );
//   }

//   return (
//     <Wrapper className='page'>
//       <h2>Account Confirmed</h2>
//       <Link to='/login' className='btn'>
//         Please login
//       </Link>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section``;

// export default VerifyPage;

import  { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'; // Redux hook'larını ekleyin
import { verifyEmail } from "../store/features/auth/authSlice"
import { toast } from 'react-toastify';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
    const [loading, setLoading] = useState(false);
  const query = useQuery();

  const dispatch = useDispatch(); // useDispatch hook'unu kullanın
  const {  isLoading, isError, message } = useSelector((state) => state.auth);
  // Redux store'dan isLoading durumunu alın

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      try {
        const data ={
          verificationToken: query.get('token'),
          email: query.get('email'),
        }
        console.log(data)
        dispatch(verifyEmail(data));
          
      } catch (error) {
        // console.log(error.response);
        console.log(error);
      }
      setLoading(false);
    };
  
    if (isError) {
      toast.error(message);
    }
    if (!isLoading) {
      verifyToken();
    }
  }, [dispatch, query, isError, isLoading, message]);

  if (loading) {
    return (
      <Wrapper className='page'>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  // ... Diğer durumları işleyin (error veya başarılı durumları)

  return (
    <Wrapper className='page'>
      <h2>Account Confirmed</h2>
      <Link to='/login' className='btn'>
        Please login
      </Link>
    </Wrapper>
  );
};


const Wrapper = styled.section``;


export default VerifyPage;