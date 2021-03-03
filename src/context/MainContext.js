import createDataContext from './createDataContext';
import { updateObject } from '../shared/utility';
import axios from '../api/projects';

const mainReducer = (state, action) => {
  switch (action.type) {
    case 'get_projects':
      return updateObject(state, {
        error: null,
        loading: true, 
        projects: action.projects,
      });
    case 'delete_project':
      return updateObject(state, {
        projects: state.projects.filter((project) => project.id !== action.id),
      });
    case 'edit_project':
      return updateObject(state, {
        projects: state.projects.map((project) => {
          return project.id === action.id ? action.edited : project;
        }),
      });
    case 'data_load':
      return updateObject(state, { error: null, loading: true });
    case 'data_success':
      return updateObject(state, { error: null, loading: false });
    case 'data_fail':
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

const getProjects = (dispatch) => async () => {
  try {
    dispatch({ type: 'data_load' });
    const response = await axios('/projects');
    dispatch({ type: 'get_projects', projects: response.data });
    dispatch({ type: 'data_success' });
  } catch (error) {
    dispatch({ type: 'data_fail', error: error });
  }
};

const addProject = () => async (e, name, description, projects, callback) => {
  e.preventDefault();
  let id;
  if (projects.length > 0) {
    id = projects.slice(-1)[0].id + 1;
  } else {
    id = 1;
  }
  await axios.post('/projects', { id, name, description, project: [] });
  if (callback) {
    callback();
  }
};

const updateProject = (dispatch) => async (
  e,
  name,
  description,
  id,
  callback
) => {
  e.preventDefault();
  await axios.patch(`/projects/${id}`, { name, description });
  dispatch({ type: 'edit_project', edited: { id, name, description } });
  if (callback) {
    callback();
  }
};

const deleteProject = (dispatch) => async (id) => {
  await axios.delete(`/projects/${id}`);
  dispatch({ type: 'delete_project', id: id });
};

export const { Provider, Context } = createDataContext(
  mainReducer,
  { getProjects, addProject, deleteProject, updateProject },
  { error: null, loading: false, projects: [] }
);
