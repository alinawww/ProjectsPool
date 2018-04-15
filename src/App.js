import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Project} from './Project.js'

const projects = [
  {id: 1, title: 'test1', details: 'test details1', tags: ['tag1', 'tag2']},
  {id: 2, title: 'ben', details: 'test details1', tags: ['tag1', 'tag2']},
  {id: 3, title: 'test1', details: 'test details1', tags: ['tag1', 'tag2']},
  {id: 4, title: 'test1', details: 'this is alina', tags: ['tag1', 'tag2']},
  {id: 5, title: 'begin', details: 'this is ben', tags: ['tag1', 'tag2']},
  {id: 6, title: 'test1', details: 'test details1', tags: ['tag1', 'tag2']},
]


class List extends React.Component {

  filter (projects) {
    if (!this.props.filter) {
      return projects
    }
    return projects.filter((project) => project.details.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
  }
  render () {
    return (
      <div className="Projects__list">
      {
        this.filter(this.props.projects)
        .map(project => <Project key={project.id} project={project}/>)
      }
      </div>
    )
  }
};

class ProjectFilter extends React.Component {

  handleChange (event) {
    this.props.updateSearch(event.target.value);
  }

  render () {
    return (
      <input type="text" placeholder="Find a project" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
    )
  }
}

class App extends Component<> {
  constructor() {
    super();
    this.state = {
      projects: projects,
      filter: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }
  updateSearch (inputValue) {
    this.setState({
      filter: inputValue
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Navigation">
          <h2>Appreciation pool</h2>
          <div className="Navigation__filters">
          </div>
        </div>
        <div className="Projects">
          <div className="Projects__search">
            <ProjectFilter updateSearch={this.updateSearch} searchText={this.state.filter}/>
          </div>
          <List filter={this.state.filter}  projects={this.state.projects}/>
        </div>
      </div>
    );
  }
}

export default App;
