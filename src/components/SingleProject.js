import React from 'react';
import { Button } from 'react-bootstrap';
import { Td } from '../styles/css';

const SingleProject = ({ count, desc, amount, remove }) => {
  return (
    <tr>
      <td>{count}</td>
      <td>{desc}</td>
      <td>{amount}</td>
      <Td style={{ textAlign: 'center', display: 'block' }}>
        <Button variant='danger' onClick={remove} className='float-none'>
          Delete
        </Button>
      </Td>
    </tr>
  );
};

export default SingleProject;
