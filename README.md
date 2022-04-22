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
    "appID": "yourappid"
}
```

Replace the username/password/appID in the above file and save it.

Now to run the rests run `npm run test` from the command line. The tests will pick up the `baseUrl` from `cypress.anyname.json` and the credentials from `cypress/fixtures/penguin/logindata.json`.
The cypress test runner will come up and you can run the tests under `penguin` to run the UI tests for this website.
