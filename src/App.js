
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Project} from './Project.js';
// import {projects} from './Projects.js';
import {filters, filterLabels} from './filters.js';
import classnames from 'classnames';
import { checkAuth, load, appendRow } from './helpers/spreadsheet';
// import { hash } from './helpers/utils';
// import * as ls from './helpers/localStorage'
import Alert from './Alert';
import AddProjectForm from './addProjectForm'
import { Provider } from "react-redux";
import store from "./store";

class List extends React.Component {
    render () {
        const {projects, selectedFilters} = this.props
        const searchResults = projects.filter((project) => project.details && project.details.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
        const filteredProjects = selectedFilters.map(selectedFilter => searchResults.filter(project => project.tags.indexOf(selectedFilter) >= 0))
        const flatFilteredProjects = [].concat.apply([], filteredProjects)
        let unique_array = flatFilteredProjects.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        const shownProjects = selectedFilters.length
                                ? unique_array
                                : searchResults
        return (
            <div className="Projects__list">
                {shownProjects.map(project => {
                    return <Project key={project.id} project={project}/>
                })}
            </div>
        )
    }
};

class ProjectSearch extends React.Component {

    handleChange (event) {
        this.props.updateSearch(event.target.value);
    }

    render () {
        return (
            <div className="search-bar">
                <i className="search-icon fa fa-search"></i>
                <input type="text" placeholder="Find a project" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
            </div>
        )
    }
}

class ProjectFilter extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.setState = this.setState.bind(this)
    }

    handleChange (event) {
        this.props.updateFilters(this.props.filter);
        this.setState({selected: !this.state.selected})
    }

    render () {
        return (
            <span className={classnames('filter', {selected: this.state.selected})} onClick={this.handleChange}>
                {this.props.filter}
            </span>
        )
    }
}

class ProjectFilterGroup extends React.Component {
    render() {
        const {filter, updateFilters} = this.props
        const groupTitle = filterLabels[filter].title
        const groupIcon = filterLabels[filter].icon
        return (
            <div className="filter-group">
                <h4 className="filter-group__title"><i className="filter-group__icon material-icons">{groupIcon}</i>{groupTitle}</h4>
                {Object.keys(filters[filter]).map(key => {
                    return <ProjectFilter key={key} updateFilters={updateFilters} filter={filters[filter][key]}/>
                })}
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            searchTerm: '',
            filters: [],
            accessToken: ''
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.updateFilters = this.updateFilters.bind(this)
    }

    componentDidMount() {
        window.gapi.load('client', () => {
            checkAuth(true, this.handleAuth.bind(this));
        });
    }

    handleAuth(authResult) {
        if (authResult && !authResult.error) {
            this.setState({
                authenticated: true
            });
            load(this.onLoad.bind(this))
        } else {
            this.setState({
                authenticated: false
            })
        }
    }

    onLoad(data, error) {
        console.log('dataaaa', data);
        if (data) {
            console.log('data exists');
            this.setState({
                ...data
            });
        }
        else {
            this.setState({
                error: error
            })
        }
    }

    handleSubmit(values, save=true) {
        const projectValues = Object.values(values)
        appendRow(projectValues, null, (error) => {
            // In case an error occured while saving, alert
            console.log('errorrrrrr', error)
        })
    }

    updateSearch(inputValue) {
        this.setState({
            searchTerm: inputValue
        });
    }

    updateFilters(filter) {
        if (this.state.filters.indexOf(filter) < 0) {
            this.setState(prevState => ({
                filters: [...prevState.filters, filter]
            }))
        }
        else {
            this.setState(prevState => ({
                filters: prevState.filters.filter((_, i) => i !== prevState.filters.indexOf(filter))
            }))
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <div className="Logo">
                        <h1>Thanks!</h1>
                    </div>

                    <div className="Projects__search">
                        <ProjectSearch updateSearch={this.updateSearch} searchText={this.state.searchTerm} />
                        <div className="Projects__add">
                            <div className="Projects__add-btn">
                                <i className="material-icons Projects__add-icon">{'library_add'}</i>
                                <a href="#add" onClick={ this.addProject.bind(this) }>Add project</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Provider store={store}>
                    <div style={{ padding: 15 }}>
                      <h2>Simple Form</h2>
                      <AddProjectForm onSubmit={this.handleSubmit} />
                    </div>
                </Provider>,
                <div className="Content">
                    <div className="Navigation">
                        <div className="Navigation__filters">
                            { Object.keys(filters).map(filter => {
                                return <ProjectFilterGroup key={filter} filter={filter} updateFilters={this.updateFilters} />
                            })}
                        </div>
                    </div>

                    { this.renderContent() }
                </div>

            </div>
        );
    }

    renderContent() {
        console.log('this state authenticated', this.state.authenticated);
        const projects = this.state.projects;
        if (this.state.authenticated !== true) {
            return (
                <div className="Projects">
                    <div className="Projects__list">
                        <button onClick={ this.authenticate.bind(this) } className="g-connect-btn">Connect with Google</button>
                    </div>
                </div>
            );
        }
        else if (projects.length) {
            return (
                <div className="Projects">
                    {/*<ProjectForm accessToken={this.state.accessToken}/>*/}
                    <List filter={this.state.searchTerm} selectedFilters={this.state.filters} projects={this.state.projects}/>
                </div>
            );
        }
        else if (this.state.error) {
            return (
                <Alert error={ this.state.error } />
            );
        }
        else {
            return (
                <div className="loader" />
            );
        }
    }

    authenticate(e) {
        e.preventDefault();
        checkAuth(false, this.handleAuth.bind(this));
    }

    addProject(values, save = true) {
        alert('shows the form')
    }

    saveNewProject() {

    }
}

export default App;
