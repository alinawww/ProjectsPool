import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Project} from './Project.js';
import {filters} from './filters.js';
import classnames from 'classnames';


const projects = [
    {id: 1, title: 'project1', details: 'test details 1', tags: [filters['team-size']['small'], filters['amount']['small']]},
    {id: 2, title: 'project2', details: 'test details 2', tags: [filters['team-size']['medium']]},
    {id: 3, title: 'project3', details: 'test details 3', tags: [filters['team-size']['medium']]},
    {id: 4, title: 'project4', details: 'test details 4', tags: [filters['team-size']['medium']]},
    {id: 5, title: 'project5', details: 'test details 5', tags: [filters['team-size']['medium']]},
    {id: 6, title: 'project6', details: 'test details 6', tags: [filters['team-size']['medium']]},
]


class List extends React.Component {
    render () {
        const {projects, selectedFilters} = this.props
        const searchResults = projects.filter((project) => project.details.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
        const filteredProjects = selectedFilters.map(selectedFilter => searchResults.filter(project => project.tags.indexOf(selectedFilter) >= 0))
        const shownProjects = selectedFilters.length
                                ? [].concat.apply([], filteredProjects)
                                : searchResults
        console.log('shownProjects', shownProjects)
        return (
            <div className="Projects__list">
                {shownProjects.map(project => {
                    console.log(project);
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
            <input type="text" placeholder="Find a project" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
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

class App extends Component<> {
    constructor() {
        super();
        this.state = {
            projects: projects,
            searchTerm: '',
            filters: []
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.updateFilters = this.updateFilters.bind(this)
    }
    updateSearch(inputValue) {
        this.setState({
            searchTerm: inputValue
        });
    }

    updateFilters(filter) {
        console.log(filter);
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
                <div className="Navigation">
                    <h2>Appreciation pool</h2>
                    <div className="Navigation__filters">
                        { Object.keys(filters).map(filter => {
                            return Object.keys(filters[filter]).map(key => {
                                return <ProjectFilter key={key} updateFilters={this.updateFilters} filter={filters[filter][key]}/>
                            })
                        })}
                    </div>
                </div>
                <div className="Projects">
                    <div className="Projects__search">
                        <ProjectSearch updateSearch={this.updateSearch} searchText={this.state.searchTerm}/>
                    </div>
                    <List filter={this.state.searchTerm} selectedFilters={this.state.filters} projects={this.state.projects}/>
                </div>
            </div>
        );
    }
}

export default App;
