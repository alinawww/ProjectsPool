// import { orderBy } from 'lodash';
// import { hash } from './utils';
// import { get } from './localStorage';

import config from '../config';

/**
* Get the user authentication status
*/
export function checkAuth(immediate, callback) {
    window.gapi.auth.authorize({
        'client_id': config.clientId,
        'scope': config.scope,
        'immediate': immediate
    }, callback);
}

/**
* Load the projects from the spreadsheet
*/
export function load(callback) {
    window.gapi.client.load('sheets', 'v4', () => {
        window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: config.spreadsheetId,
            range: 'A1:I'
        }).then((response) => {
            console.log(response);
            const data = response.result.values
            console.log(data);

            const projectFields = data[0]
            console.log(projectFields);
            let projects = data.map((project, i) => {
                let row = i + 2 // Save row ID fore later update
                let id = i
                let title = project[0]
                let details = project[8]
                let tags = [
                    project[1], project[2], project[3], project[4], project[5], project[6], project[7]
                ]

                return {
                    row,
                    id,
                    title,
                    details,
                    tags
                }
            })
            projects.shift()


            callback({
                projects,
            });
        }, (response) => {
            callback(false, response.result.error);
        });
    });
}

/**
* Update a single cell value
*/
export function updateCell(column, row, value, successCallback, errorCallback) {
    window.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: config.spreadsheetId,
        range: 'Sheet1!' + column + row,
        valueInputOption: 'USER_ENTERED',
        values: [ [value] ]
    }).then(successCallback, errorCallback);
}
