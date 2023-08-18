import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AuthBackground from '../../assets/image/auth/AuthBackGround'
// import Loading from "../loading/Loading"
// import HashLoader from "react-spinners/HashLoader";
import Spinner from "../../components/Spinner.jsx"
const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    
});

const StyledPaper = styled(Paper)({
    width: '400px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f2f2f2',
    
});


// const override = "
//   text-align: center,
//   display: flex,
//   justify-content: center,
//   align-items: center,
//   width: 100%,
//   height: 100vh
// ";

const EmailVerify = () => {
    const { email } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
        
       {loading ? <Spinner/>:
           <> <AuthBackground />
           <CenteredContainer>
               <StyledPaper>
                   <Typography variant="h5" gutterBottom>
                       E-posta Onaylama
                   </Typography>
                   <Typography variant="body1" gutterBottom>
                       Lütfen {email} adresinize gelen maildeki linke tıklayarak onaylama işlemini tamamlayınız.
                   </Typography>
                   
               </StyledPaper>
           </CenteredContainer></>}
      
        </>
    );
};

export default EmailVerify;
