# Project Penguin

This is a project that is testing a confidential website. The details about the website, its url and credentials used to login will not be disclosed in this repo. For those who have access, they need to do the following to run the tests in this repo:

## Setup

Git clone this repo to your local machine.

A lot of files with credentials and appIDs need to be edited before the automated tests can run succcessfully.

Here are the files you will need to edit(instructions below):

1. `cypress.anyname.json`
2. `cypress/fixtures/penguin/logindata.json`
3. `/cypress/fixtures/penguin/appdata.json`
4. Update `applicationId` in `/cypress/fixtures/penguin/testdata/*.json`
5. `cypress/fixtures/penguin/logindatainvalidbearertoken.json`. Give invalid bearer token.
6. `cypress/fixtures/penguin/logindatainvalidprivatetoken.json`. Give invalid private token.

Then run:

1. `npm install` from the command line.
2. `npm run test` from the command line to run the tests.
3. Run the tests under the `penguin` folder

### Edit file `cypress.anyname.json`

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

Replace the url in the above file and save it. (This should not have :portnumber/api, it is the URL of the UI). Now when you run `npm run test` it will automatically pick up the `baseUrl` from here, instead of picking it up from `/cypress.json`.

### Edit file `cypress/fixtures/penguin/logindata.json`

A username, password, appID and API key are required for these tests to work. This information is stored in the file `cypress/fixtures/penguin/logindata.json`. The format of this file is:

```
{
    "username": "yourusername",
    "password": "yourpassword",
    "bearerToken" : "yourbearertoken",
    "privateToken": "yourprivatetoken",
    "appID": "yourappID",
    "recordID": "recordIDcreatedinUI"
}
```

Replace the username,password, bearerToken, privateToken and appID in the above file and save it.
Create a new record in the UI and save that recordID in this file.
A GET API test "should be able to make a GET request for a particular hardcoded record" in the file `/cypress/integration/penguin/apitests/getrequest.spec.js` uses this recordID. You will need to update that test with hardcoded values of First Name, Last Name, City that you put in the UI when saving a record, otherwise that test will fail.

Now to run the rests run `npm run test` from the command line. The tests will pick up the `baseUrl` from `cypress.anyname.json` and the credentials from `cypress/fixtures/penguin/logindata.json`.
The cypress test runner will come up and you can run the tests under the `/cypress/integration/penguin` directory to run the UI and API tests for this website.

There are 3 subfolders:

`apitests` : has the GET/POST/DELETE API Tests
`login` : has the UI login tests
`newrecord`: has the UI tests for the creation of a new record

### Edit file `/cypress/fixtures/penguin/appdata.json`

```
{
    "APIUrl": "https://yourapiurl:<portnumber>/api",
    "appID": "yourapplicationID"
}
```

### Update `applicationId` in `/cypress/fixtures/penguin/testdata/*.json`

The format of the data.json files is the following:

```
{
"applicationId": "yourappIDhere",
"values": {
  "$type": string
 ...
}
```

Note: The appID for which this user has access (which is in `cypress/fixtures/penguin/appdata.json`) is hardcoded in `cypress/fixtures/penguin/testdata/*.json` files as the value for the key `applicationId`. [This was the appID given to me]. To run the tests with the same data using your own credentials, make sure this applicationID is correct and matches the applicationID of the application being tested.

### Edit login data for GET authentication tests

Create the following 2 files for GET authentication tests(you can copy `cypress/fixtures/penguin/logindata.json` and edit the tokens):

`cypress/fixtures/penguin/logindatainvalidbearertoken.json` should contain

```
{
    "username": "yourusername",
    "password": "yourpassword",
    "bearerToken" : "INVALIDbearertoken",
    "privateToken": "yourprivatetoken",
    "appID": "yourappID",
    "recordID": "recordIDcreatedinUI"
}
```

`cypress/fixtures/penguin/logindatainvalidprivatetoken.json` should contain

```
{
    "username": "yourusername",
    "password": "yourpassword",
    "bearerToken" : "yourbearertoken",
    "privateToken": "INVALIDprivatetoken",
    "appID": "yourappID",
    "recordID": "recordIDcreatedinUI"
}
```

### Edit RecordID values for hardcoded test or skip the test

One API: GET test checks for hard coded values.

To make this test work:

**File:** `/cypress/integration/penguin/apitests/getrequest.spec.js`

**UserStory: GET API**
**Test case:** should be able to make a GET request for a particular hardcoded record

You can create a New Record in the UI with the following information:
First Name: `Sarah`
Last Name: `Doe`
City: `Paris`

Enter the recordID for this test in `/cypress/penguin/logindata.json` in the field `recordID`

Or alternatively, follow the instructions in the [code](https://github.com/pramam/cypress-projectpenguin/blob/af031ba6dd53b7c033e19bc3a29a0960cd57508a/cypress/integration/penguin/apitests/getrequest.spec.js#L10)

To skip the test, add .skip after `it` for this particular test:

`it.skip(\"should be able to make a GET request for a particular hardcoded record\")`
