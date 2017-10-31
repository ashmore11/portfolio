import './style.scss';

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

class Home extends Component {
  renderProjects() {
    const { projects } = this.props;

    return !isLoaded(projects)
      ? 'Loading'
      : isEmpty(projects)
        ? 'Projects list is empty'
        : projects.map(project => (
            <li key={project.id} id={project.id}>
              {project.title}
            </li>
          ));
  }

  render() {
    const { projects } = this.props;

    return (
      <section className="Page Home">
        <h1>HOME</h1>
        <br />
        <ul>{this.renderProjects()}</ul>
        <br />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.firebase.data.projects
});

export default compose(firebaseConnect(['projects']), connect(mapStateToProps))(
  Home
);
