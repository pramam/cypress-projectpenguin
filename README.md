# Project Penguin

This is a project that is testing a confidential website. The details about the website, its url and credentials used to login will not be disclosed in this repo. For those who have access, they need to do the following to run the tests in this repo:

## Setup

Git clone this repo to your local machine.

The file `package.json` has the following lines:

```
"scripts": {
    "test": "npx cypress open --config-file cypress.anyname.json"
  },
```

The format of the file `cypress.anyname.json` should be:

```
{
    "baseUrl": "https://urlofappbeingtested"
}
```

Replace the url in the above file and save it. Now when you run `npm run test` it will automatically pick up the `baseUrl` from here, instead of picking it up from `/cypress.json`.

A username, password, appID and API key are required for these tests to work. This information is stored in the file `cypress/fixtures/penguin/logindata.json`. The format of this file is:

```
{
    "username": "yourusername",
    "password": "yourpassword",
    "bearerToken" : "yourbearertoken",
    "privateToken": "yourprivatetoken",
    "appID": "yourappID"
    "recordID" : "yourrecordID"
}
```

Replace the username/password/appID in the above file and save it.
Create a new record in the UI and save that recordID in this file.
A GET API test "should be able to make a GET request for a particular hardcoded record" in the file `/cypress/integration/penguin/apitests/getrequest.spec.js` uses this recordID. You will need to update that test with hardcoded values of First Name, Last Name, City that you put in the UI when saving a record.

Now to run the rests run `npm run test` from the command line. The tests will pick up the `baseUrl` from `cypress.anyname.json` and the credentials from `cypress/fixtures/penguin/logindata.json`.
The cypress test runner will come up and you can run the tests under the `penguin` directory to run the UI and API tests for this website.

There are 3 subfolders:

`/penguin/apitests` : has the GET/POST/DELETE API Tests
`/penguin/login` : has the UI login tests
`/penguin/newrecord`: has the UI tests for the creation of a new record

TODO: `appdata.json` fixtures file. Sample needs to be checked in
TODO: `logindata.json` with recordID needs to be checked in

Note: The appID for which this user has access (which is in `cypress/fixtures/penguin/appdata.json`) is hardcoded in `cypress/fixtures/penguin/testdata/*.json` files as the value for the key `applicationId`. To run the tests with the same data using your own credentials, make sure this applicationId is correct and matches the applicationId of the application being tested.
