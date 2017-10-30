import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebMap, WebScene } from 'react-arcgis';

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
        <div style={{ width: '100vw', height: '100vh' }}>
          <WebMap id="6627e1dd5f594160ac60f9dfc411673f" />
          <WebScene id="f8aa0c25485a40a1ada1e4b600522681" />
        </div>
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
