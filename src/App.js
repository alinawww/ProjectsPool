import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Project} from './Project.js';
import {filters} from './filters.js';
import classnames from 'classnames';


const projects = [
    {id: 1, title: 'test1', details: 'test details1', tags: [filters['team-size']['small']]},
    {id: 2, title: 'ben', details: 'test details1', tags: [filters['team-size']['medium']]},
    {id: 3, title: 'test1', details: 'test details1', tags: ['tag1', 'tag2', 'tag3']},
    {id: 4, title: 'test1', details: 'this is alina', tags: ['tag1', 'tag2']},
    {id: 5, title: 'begin', details: 'this is ben', tags: ['tag1', 'tag2']},
    {id: 6, title: 'test1', details: 'test details1', tags: ['tag1', 'tag2']},
]


class List extends React.Component {
    constructor() {
        super();
        this.state = {
            filteredProjects: projects,
        }
        this.filter = this.filter.bind(this)
    }
    filter (projects) {
        if (this.props.filter) {
            const filteredProjects = projects.filter((project) => project.details.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
            this.setState({filteredProjects})
        }
        console.log(this.props.selectedFilters);
        return this.state.filteredProjects;
        // return this.state.filteredProjects.filter((project) => this.props.selectedFilters.some(r => project.tags.indexOf(r) >= 0))
        // return this.state.filteredProjects.filter((project) => project.tags.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
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
            filter: inputValue
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
