/// <reference types="cypress" />

Cypress.Commands.add("POSTrecord", (appData, loginData, postBody) => {
  cy.request({
    method: "POST",
    url: `${appData.APIUrl}/app/${appData.appID}/record`,
    failOnStatusCode: false,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + loginData.bearerToken,
      "Private-Token": loginData.privateToken,
    },
    body: postBody,
  });
});

Cypress.Commands.add("GETrecordbyid", (appData, loginData, recordID) => {
  cy.request({
    method: "GET",
    url: `${appData.APIUrl}/app/${appData.appID}/record/${recordID}`,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + loginData.bearerToken,
      "Private-Token": loginData.privateToken,
    },
  });
});
