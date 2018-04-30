import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Project} from './Project.js';
import {projects} from './Projects.js';
import {filters, filterLabels} from './filters.js';
import classnames from 'classnames';
// import GoogleLogin from 'react-google-login';

// class ProjectForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: ''
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event) {
//         this.setState({value: event.target.value});
//     }
//
//     handleSubmit(event) {
//         console.log(this.props);
//         event.preventDefault();
//         const fields = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
//         const self = this
//         let row = '';
//         fields.map(field => {
//             return row += '"'+ self.state.value +'",';
//         })
//         // Clean Row
// 		row = row.slice(0, -1);
//         console.log('row', row);
//         // Config
//         const gs_sid = '1bWOM_zbnNrSujOpiDU9rGdxwwSXGhppsU8mn_v9RhnI'; // Enter your Google Sheet ID here
//         const gs_clid = '645401863724-r7o2jhsfotcq11jou0bsahbfun2c4t0t.apps.googleusercontent.com'; // Enter your API Client ID here
//         const gs_clis = 'LrH2i1ksne0e9B4YK-o6W2Yd'; // Enter your API Client Secret here
//         // const gs_rtok = this.props.accessToken; // Enter your OAuth Refresh Token here
//         const gs_rtok = 'https://www.googleapis.com/oauth2/v4/token?code='+this.props.accessToken+'&client_id='+gs_clid+'&client_secret='+gs_clis+'&grant_type='
//         let gs_atok = false;
//         const gs_url = 'https://sheets.googleapis.com/v4/spreadsheets/'+gs_sid+'/values/A1:append?includeValuesInResponse=false&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=USER_ENTERED';
//         const gs_body = '{"majorDimension":"ROWS", "values":[['+row+']]}';
//         console.log(gs_body);
//          // HTTP Request Token Refresh
//         let xhr = new XMLHttpRequest();
//         xhr.open('POST', 'https://www.googleapis.com/oauth2/v4/token?client_id='+gs_clid+'&client_secret='+gs_clis+'&refresh_token='+gs_rtok+'&grant_type=refresh_token');
//         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         xhr.onload = function() {
//             const response = JSON.parse(xhr.responseText);
//             console.log('response', response);
//             gs_atok = response.access_token;
// 			// HTTP Request Append Data
//             if ( gs_atok ) {
//                 let xxhr = new XMLHttpRequest();
//                 xxhr.open('POST', gs_url);
//                 // xxhr.setRequestHeader('Content-length', gs_body.length);
//                 xxhr.setRequestHeader('Content-type', 'application/json');
//                 xxhr.setRequestHeader('Authorization', 'OAuth ' + gs_atok );
//                 xxhr.onload = function() {
// 					if(xxhr.status === 200) {
// 						// Success
//                         console.log('success');
//                     }
//                     else {
// 						// Fail
// 						console.log('failure');
// 					}
//                 };
//                 xxhr.send(gs_body);
//             }
//         };
//         xhr.send();
//     }
//
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     One:
//                     <input name="one" type="text" value={this.state.value.one} onChange={this.handleChange} />
//                 </label>
//                 <label>
//                     Two:
//                     <input name="two" type="text" value={this.state.value.two} onChange={this.handleChange} />
//                 </label>
//                 <label>
//                     Three:
//                     <input name="three" type="text" value={this.state.value.three} onChange={this.handleChange} />
//                 </label>
//                 <label>
//                     Four:
//                     <input name="four" type="text" value={this.state.value.four} onChange={this.handleChange} />
//                 </label>
//                 <label>
//                     Five:
//                     <input name="five" type="text" value={this.state.value.five} onChange={this.handleChange} />
//                 </label>
//                 <label>
//                     Six:
//                     <input name="six" type="text" value={this.state.value.six} onChange={this.handleChange} />
//                 </label>
//                 <label>
//                     Seven:
//                     <input name="seven" type="text" value={this.state.value.seven} onChange={this.handleChange} />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }

//
// const responseGoogle = (response) => {
//   console.log(response);
// }

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
        return (
            <div className="filter-group">
                <h4 className="filter-group__title">{filterLabels[filter]}</h4>
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
            filters: [],
            accessToken: ''
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.updateFilters = this.updateFilters.bind(this)
        this.authenticate = this.authenticate.bind(this)
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

    authenticate(response) {
        console.log(response);
        response && response.accessToken && this.setState({accessToken: response.accessToken})
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
                    </div>
                </div>
                <div className="Content">
                    <div className="Navigation">
                        {/*
                        <GoogleLogin
                            clientId="645401863724-r7o2jhsfotcq11jou0bsahbfun2c4t0t.apps.googleusercontent.com"
                            accessType="code"
                            buttonText="Login"
                            onSuccess={this.authenticate}
                            onFailure={this.authenticate}
                          />
                          */}
                        <div className="Navigation__filters">
                            { Object.keys(filters).map(filter => {
                                return <ProjectFilterGroup key={filter} filter={filter} updateFilters={this.updateFilters} />
                            })}
                        </div>
                    </div>
                    <div className="Projects">

                        {/*<ProjectForm accessToken={this.state.accessToken}/>*/}
                        <List filter={this.state.searchTerm} selectedFilters={this.state.filters} projects={this.state.projects}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
