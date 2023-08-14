
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <Wrapper className='page'>
      <div>
        <h1>404</h1>
        <h4>page not found</h4>
        <Link to='/' className='btn'>
          Back Home
        </Link>
      </div>
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

export default NotFound;