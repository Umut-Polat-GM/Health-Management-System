import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import HashLoader from "react-spinners/HashLoader";
import { styled } from '@mui/material/styles';
import AuthBackground from '../../assets/image/auth/AuthBackGround'


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

const PasswordReset = () => {
    const { email } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>{loading ? <HashLoader color='#c6e2ff' style={{ width: '70%', textAlign:"center",display:"flex", justifyContent:"center",alignItems:"center",height:"100vh"}}/>: 
           <> <AuthBackground />
            <CenteredContainer>
                <StyledPaper>
                    <Typography variant="h5" gutterBottom>
                        Şifre Sıfırlama
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Lütfen {email} Adresinize Gelen Maildeki Linke Tıklayarak Şifre Sıfırlama işlemini Tamamlayınız.
                    </Typography>

                </StyledPaper>
            </CenteredContainer></>
        }
        </>
    );
};

export default PasswordReset;
