
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
        const searchResults = projects.filter((project) => {
            const projectText = Object.values(project).join(', ').toLowerCase()
            return projectText.indexOf(this.props.filter.toLowerCase()) >= 0
        })
        // const filterLabels = selectedFilters.map(selectedFilter => Object.keys(selectedFilter))
        //
        // const filteredProjects = selectedFilters.map(selectedFilter => {
        //     const something = Object.keys(selectedFilter).map(filter_label => {
        //         // console.log(searchResults);
        //         // console.log('results', searchResults.filter(project => project[filter_label] === selectedFilter[filter_label]));
        //         return searchResults.filter(project => project[filter_label] === selectedFilter[filter_label])
        //     })
        //     // console.log('something', something);
        //     return something
        // })

        const filteredProjects = []
        const flatFilteredProjects = [].concat.apply([], filteredProjects)
        let unique_array = flatFilteredProjects.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        const shownProjects = selectedFilters.length
                                ? unique_array
                                : searchResults
        const labels = Object.keys(projects[0]).filter(label => {
            return label !== 'id' && label !== 'description' && label !== 'project_name'
        })
        return (
            <div className="Projects__list">
                {shownProjects.map(project => {
                    // console.log('aLINAAAA', project);
                    return <Project key={project.id} project={project} labels={labels}/>
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
        // console.log('in proj filter', this.props.filter);
        // console.log(Object.values(this.props.filter));
        return (
            <span className={classnames('filter', {selected: this.state.selected})} onClick={this.handleChange}>
                {Object.values(this.props.filter)[0]}
            </span>
        )
    }
}

class ProjectFilterGroup extends React.Component {
    render() {
        // console.log(this.props);
        const {filter, updateFilters} = this.props
        const groupTitle = filters[filter].labels.title
        const groupIcon = filters[filter].labels.icon
        const filterOptions = Object.keys(filters[filter].options)
        // console.log('filters[filter].options', filters[filter].options);
        return (
            <div className="filter-group">
                <h4 className="filter-group__title"><i className="filter-group__icon material-icons">{groupIcon}</i>{groupTitle}</h4>
                {filterOptions.map(key => {
                    console.log('filter', filter);
                    console.log('filters[filter]', filters[filter]);
                    const filterObj = {}
                    filterObj[filter] = filters[filter].options[key]
                    return <ProjectFilter key={key} updateFilters={updateFilters} filter={filterObj}/>
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
            filters: {},
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
        if (data) {
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

    // filter is a an object: {'team_size': '6-12'}
    updateFilters(filter) {

        // Object.keys(this.state.filters).map(filter_label => {
        //     if (Object.values(this.state.filters[filter_label]).indexOf(Object.values(filter)) < 0) {
        //         console.log('');
        //         this.setState(prevState => ({
        //             filters: [...prevState.filters, filter]
        //         }))
        //     }
        //     else {
        //         this.setState(prevState => ({
        //             filters: prevState.filters.filter((_, i) => i !== prevState.filters.indexOf(filter))
        //         }))
        //     }
        // })
        // const filterLabel = Object.keys(filter)[0]
        // console.log('filterLabel', filterLabel);
        // console.log('this.state.filters[filterLabel]', this.state.filters);
        // const filterValues = this.state.filters[filterLabel]
        // console.log('filterValues', filterValues);
        // const filterValue = filterValues.push(Object.values(filter)[0])
        // const updatedFilters = this.state.filters[filterLabel] = filterValues
        //
        // const obj = {filterValue: filterValue}
        // // console.log('filterValue', filterValue);
        // this.setState((prevState) => ({
        //     filters: {...prevState.filters}
        // }));
        const newFilters = Object.assign(filter, this.state.filters)
        this.setState({filters: newFilters})
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
        // console.log('this state authenticated', this.state.authenticated);
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
