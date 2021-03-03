import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Context as MainContext } from '../context/MainContext';
import { Loader, Th } from '../styles/css';
import SingleMain from '../components/SingleMain';
import withErrorHandler from '../hoc/withErrorHandler';
import axios from '../api/projects';
import Form from '../components/Form';
import { changeHandler } from '../shared/utility';

const Main = () => {
  const {
    state: { projects, loading },
    getProjects,
    addProject,
    deleteProject,
    updateProject,
  } = useContext(MainContext);

  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(null);

  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    name: {
      value: '',
      touched: false,
      validation: {
        required: true,
        minLength: 6,
        maxLength: 50,
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

  useEffect(() => { 
    getProjects();
  }, []);

  const onChangeHandler = (e) => {
    const [updateForm, formValid] = changeHandler(e, form);
    setForm(updateForm);
    setFormIsValid(formValid);
  };

  const clearInputs = () => {
    form.name.value = '';
    form.description.value = '';
    setInitFormState(false);
  };

  const setInitFormState = (state) => {
    form.name.touched = state;
    form.name.valid = state;
    form.description.touched = state;
    form.description.valid = state;
    setFormIsValid(state);
  };

  const setProjectForEdit = (id) => {
    const curEditProject = projects.find((project) => project.id === id);

    form.name.value = curEditProject.name;
    form.description.value = curEditProject.description;

    setInitFormState(true);
    setEditMode(true);
    setEditedProject(curEditProject);
  };

  return (
    <Fragment>
      <Container className='my-5'>
        <Row>
          <Col>
            <h1>Add Your Project</h1>
            <Form
              valueName={form.name.value}
              valueDesc={form.description.value}
              validName={form.name.valid}
              validDesc={form.description.valid}
              touchedName={form.name.touched}
              touchedDesc={form.description.touched}
              formIsValid={formIsValid}
              changeHandler={onChangeHandler}
              edit={editMode}
              clicked={(e) => {
                !editMode
                  ? addProject(
                      e,
                      form.name.value,
                      form.description.value,
                      projects,
                      () => getProjects()
                    ) && clearInputs()
                  : updateProject(
                      e,
                      form.name.value,
                      form.description.value,
                      editedProject.id,
                      () => getProjects()
                    );
                clearInputs();
                setEditMode(false);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loader />
            ) : (
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length > 0 &&
                    projects.map((project, index) => (
                      <SingleMain
                        key={project.id}
                        id={project.id}
                        count={index + 1}
                        name={project.name}
                        desc={project.description}
                        remove={() => {
                          deleteProject(project.id);
                          clearInputs();
                        }}
                        update={() => setProjectForEdit(project.id)}
                      />
                    ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default withErrorHandler(Main, axios);
