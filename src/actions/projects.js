import { createAction } from 'redux-actions';

export const SET_PROJECTS = 'SET_PROJECTS';
export const setProjects = createAction(SET_PROJECTS);

export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';
export const setCurrentProject = createAction(SET_CURRENT_PROJECT);

export const fetchProjectsAsync = () => {
  return async dispatch => {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      dispatch(setProjects(data.projects));
    } catch (e) {
      console.warn('Error fetching projects:', e.message);
    }
  };
};

export const setCurrentProjectAsync = id => {
  return async dispatch => {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      const project = data.projects.find(project => project.id === id);
      dispatch(setCurrentProject(project));
    } catch (e) {
      console.warn('Error setting current project:', e.message);
    }
  };
};
