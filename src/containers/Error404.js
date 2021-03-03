import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Error = styled.div`
  padding: 100px 0;
  text-align: center;

  & h1 {
    font-size: 70px;
    color: #f95e6d;
  }
  & p {
    font-size: 20px;
  }

  & .link {
    font-size: 20px;
  }
`;

const Error404 = () => {
  return (
    <Error>
      <h1>Error 404</h1>
      <p>
        You reached a dead end. Go back to the{' '}
        <Link to='/' className='link'>
          Homepage
        </Link>{' '}
      </p>
    </Error>
  );
};

export default Error404;
