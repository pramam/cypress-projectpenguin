/// <reference types="cypress" />

describe("UserStory: GET API", () => {
  it(`should be able to make a GET request for a particular record`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.request({
          method: "GET",
          url: `${appData.APIUrl}/app/${appData.appID}/record/${appData.recordID}`,
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + loginData.bearerToken,
            "Private-Token": loginData.privateToken,
          },
        }).then((res) => {
          console.log(res.status);
          // Hack for now
          cy.writeFile(`temp/${appData.recordID}-GET-output.json`, res.body);
          cy.readFile(`temp/${appData.recordID}-GET-output.json`).then(
            (json) => {
              expect(json).to.be.an("object");
              cy.log(json.trackingFull);
            }
          );
        });
      });
    });
  });
});
