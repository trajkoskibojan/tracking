import React from 'react';
import { Button } from 'react-bootstrap';
import { Links, Td } from '../styles/css';

const SingleMain = ({ count, name, desc, remove, update, id }) => {
  return (
    <tr>
      <td>{count}</td>
      <td>{name}</td>
      <td>{desc}</td>
      <Td>
        <Links to={`/project/${id}`}>View</Links>
        <Button variant='warning' onClick={update}>
          Edit
        </Button>
        <Button variant='danger' onClick={remove}>
          Delete
        </Button>
      </Td>
    </tr>
  );
};

export default SingleMain;
