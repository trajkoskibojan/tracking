import React from 'react';
import { Button, Form } from 'react-bootstrap';

const styles = {
  cursor: 'not-allowed',
};

const Forms = ({
  clicked,
  edit,
  valueName,
  valueDesc,
  validName,
  touchedName,
  validDesc,
  touchedDesc,
  changeHandler,
  formIsValid,
  amount,
}) => {
  return (
    <Form className='my-5' onSubmit={clicked}>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>{amount ? 'Amount' : 'Name'}</Form.Label>
        <Form.Control
          type='text'
          name={amount ? 'amount' : 'name'}
          placeholder={amount ? 'Amount' : 'Name'}
          value={valueName}
          onChange={changeHandler}
        />
        {touchedName && !validName ? (
          <Form.Text className='text-danger'>
            {amount
              ? 'Please enter Numeric value'
              : 'Please enter min 6 - max 50 characters'}
          </Form.Text>
        ) : null}
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type='text'
          name='description'
          placeholder='Description'
          value={valueDesc}
          onChange={changeHandler}
        />
        {touchedDesc && !validDesc ? (
          <Form.Text className='text-danger'>
            Please enter min 6 - max 100 characters
          </Form.Text>
        ) : null}
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        disabled={!formIsValid}
        style={!formIsValid ? styles : null}
      >
        {!edit && !amount
          ? 'Add Project'
          : amount
          ? 'Log Hours'
          : 'Update Project'}
      </Button>
    </Form>
  );
};

export default Forms;
