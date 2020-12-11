import { chartData, listData } from './mock-data';

export function configureMockBackend() {
    let users = [
                    { id: 1, username: 'user1', email: 'user1@test.com', password: 'test' },
                    { id: 2, username: 'user.2', email: 'user2@test.com', password: 'test' },
                    { id: 3, username: 'user_3', email: 'user3@test.com', password: 'test' }
                ];
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {

                    // TODO: call the ws

                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return (user.username === params.username || user.email === params.username) && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            token: 'eyJhbFakeTokenXVCJ9'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Invalid Credentials');
                    }

                    return;
                }
                // fetch chart data
                if (url.endsWith('/data/chartData') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer eyJhbFakeTokenXVCJ9') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(chartData)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }
                // fetch list data
                if (url.endsWith('/data/listData') && opts.method === 'POST') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer eyJhbFakeTokenXVCJ9') {
                        let params = JSON.parse(opts.body);
                        // first filter the array and then get the requested page
                        const filteredArray = filter(listData, params.filter);
                        const results = paginate(filteredArray, params.rowsPerPage, params.page);
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify({data: results, resultCount: filteredArray.length, page: params.page, rowsPerPage: params.rowsPerPage})) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

            }, 500);
        });
    }
}

function filter(array, filter, rowsPerPage, page) {
    // create regex with uppercase filter for case insensitive match 
    const reg = new RegExp(filter.toUpperCase(), "g");
    function customFilter(obj) {
        // check for each prop of the object
        for (var prop in obj) {
            if (obj[prop].toString().toUpperCase().match(reg))
                return true;
        }
        return false;
    }
    return array.filter(customFilter);
}

function paginate(array, rowsPerPage, page) {
    //
    return array.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
}