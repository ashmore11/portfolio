import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProjectsAsync, setCurrentProjectAsync } from 'actions';

class Home extends Component {
  componentDidMount() {
    const { projects, fetchProjects } = this.props;

    if (!projects) fetchProjects();
  }

  projectClicked = event => {
    const { setCurrentProject } = this.props;

    setCurrentProject(event.target.id);
  };

  render() {
    const { projects, currentProject } = this.props;

    if (!projects) return null;

    return (
      <section className="Page Home">
        <h1>HOME</h1>

        <br />
        <br />

        <ul>
          {projects.map((project, index) => (
            <li key={project.id} id={project.id} onClick={this.projectClicked}>
              {project.title}
            </li>
          ))}
        </ul>

        <br />
        <br />

        {currentProject && <div>Current Project: {currentProject.title}</div>}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects,
  currentProject: state.project.currentProject
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsAsync()),
  setCurrentProject: id => dispatch(setCurrentProjectAsync(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
