import { SET_PROJECTS, SET_CURRENT_PROJECT } from 'actions';

const initialState = {
  projects: null,
  currentProject: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: payload
      };
    case SET_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: payload
      };
    default:
      return state;
  }
};
