import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Context as MainContext } from '../context/MainContext';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { Links, Loader, Th } from '../styles/css';
import withErrorHandler from '../hoc/withErrorHandler';
import axios from '../api/projects';
import Form from '../components/Form';
import SingleProject from '../components/SingleProject';
import Modal from '../components/Modal';
import { changeHandler, updateObject } from '../shared/utility';
import { v4 as uuid } from 'uuid';

const Project = (props) => {
  const {
    state: { projects, loading },
    getProjects,
  } = useContext(MainContext);

  const [showModal, setShowModal] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    amount: {
      value: '',
      touched: false,
      validation: {
        required: true,
        isNumeric: true,
      },
      valid: false,
    },
    description: {
      value: '',
      validation: {
        required: true,
        minLength: 6,
        maxLength: 100,
      },
      valid: false,
    },
  });

  const onChangeHandler = (e) => {
    const [updateForm, formValid] = changeHandler(e, form);
    setForm(updateForm);
    setFormIsValid(formValid);
  };

  const ID = +props.match.params.id;
  let selected;
  let totalHours;
  if (projects.length > 0) {
    selected = projects.find((project) => project.id === ID);
    totalHours = selected.project.reduce((acc, cur) => acc + cur.amount, 0);
  }

  useEffect(() => {
    getProjects();
  }, []);

  const clearInputs = () => {
    form.amount.value = '';
    form.description.value = '';
    setInitFormState(false);
  };

  const setInitFormState = (state) => {
    form.amount.touched = state;
    form.amount.valid = state;
    form.description.touched = state;
    form.description.valid = state;
    setFormIsValid(state);
  };

  //Not the best way but Json Server fake api does not support nested routes, so no POST request could be send, this is just work around  to make app functional;
  const addLogHours = async (e) => {
    e.preventDefault();
    const update = updateObject(selected, {
      project: [
        ...selected.project,
        {
          id: uuid(),
          amount: +form.amount.value,
          description: form.description.value,
        },
      ],
    });

    await axios.put(`/projects/${selected.id}`, update);
    getProjects();
    clearInputs();
    setShowModal(false);
  }; 

  //Not the best way but Json Server fake api does not support nested routes, so no DELETE request could be send, this is just work around  to make app functional;
  const deleteLogHours = async (id) => {
    const update = updateObject(selected, {
      project: selected.project.filter((el) => el.id !== id),
    });

    await axios.put(`/projects/${selected.id}`, update);
    getProjects();
  };

  return (
    <Fragment>
      <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        {
          <Form
            amount={true}
            valueName={form.amount.value}
            valueDesc={form.description.value}
            validName={form.amount.valid}
            validDesc={form.description.valid}
            touchedName={form.amount.touched}
            touchedDesc={form.description.touched}
            formIsValid={formIsValid}
            changeHandler={onChangeHandler}
            clicked={addLogHours}
          />
        }
      </Modal>
      <Container className='my-5'>
        <Row>
          <Col>
            <Links to='/' className='mb-5'>
              GO Back
            </Links>
            <h1 className='mb-3'>Project Details</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                {selected && (
                  <div className='mb-5'>
                    <h4>Name: {selected.name}</h4>
                    <h4>Description: {selected.description}</h4>
                    <h4>Total added hours: {totalHours}</h4>
                  </div>
                )}
                <Button
                  className='mb-3 float-right'
                  variant='primary'
                  onClick={() => setShowModal(true)}
                >
                  Log hours
                </Button>
                <Table striped bordered hover variant='dark'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected &&
                      selected.project.map((p, index) => (
                        <SingleProject
                          key={p.id}
                          count={index + 1}
                          desc={p.description}
                          amount={p.amount}
                          remove={() => deleteLogHours(p.id)}
                        />
                      ))}
                  </tbody>
                </Table>
              </Fragment>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default withErrorHandler(Project, axios);
