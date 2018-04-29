import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Project} from './Project.js';
import {projects} from './Projects.js';
import {filters, filterLabels} from './filters.js';
import classnames from 'classnames';


class List extends React.Component {
    render () {
        const {projects, selectedFilters} = this.props
        const searchResults = projects.filter((project) => project.details.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
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

class ProjectFilterGroup extends React.Component {
    render() {
        const {filter, updateFilters} = this.props
        return (
            <div>
                <h4>{filterLabels[filter]}</h4>
                {Object.keys(filters[filter]).map(key => {
                    return <ProjectFilter key={key} updateFilters={updateFilters} filter={filters[filter][key]}/>
                })}
            </div>
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
                            return <ProjectFilterGroup key={filter} filter={filter} updateFilters={this.updateFilters} />
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
