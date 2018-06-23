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
            const rows = response.result.values
            const columns = rows[0]
            let projects = []

            for (var row_idx = 1; row_idx < rows.length; row_idx++) {
                let project = {}
                project['id'] = row_idx
                columns.map((field, col_idx) => {
                    return project[field] = rows[row_idx][col_idx]
                })
                projects.push(project)
            }

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
// values needs to be an array of all the values in the correct order
export function appendRow(values, successCallback, errorCallback) {
    const params = {
        spreadsheetId: config.spreadsheetId,
        range: 'A1',
        includeValuesInResponse: true,
        insertDataOption: 'INSERT_ROWS',
        responseDateTimeRenderOption: 'FORMATTED_STRING',
        responseValueRenderOption: 'FORMATTED_VALUE',
        valueInputOption: 'USER_ENTERED',
    }
    var valueRangeBody = {
        "majorDimension": "ROWS",
        "values": [values],
        "range": "A1"
    }
    window.gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody)
        .then(successCallback, errorCallback);
}
