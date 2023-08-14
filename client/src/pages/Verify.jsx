import { useEffect, useState } from 'react';
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
  const { isLoading, isError, message } = useSelector((state) => state.auth);
  // Redux store'dan isLoading durumunu alın

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      try {
        const data = {
          verificationToken: query.get('token'),
          email: query.get('email'),
        };
        
        dispatch(verifyEmail(data)); // await ile verifyEmail işleminin tamamlanmasını bekleyin
        
        if (isError) {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // İşlem tamamlandığında setLoading(false) çağrılsın
      }
    };
  
    if (!isLoading) {
      verifyToken();
     }// Düzgün bir işlem akışı için burada verifyToken fonksiyonunu çağırın
  }, [dispatch, query,isLoading, isError, message]);

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
        Please Login
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  align-items: center;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 9rem;
  }
`;

export default VerifyPage;