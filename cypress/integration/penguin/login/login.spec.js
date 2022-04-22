/// <reference types="cypress" />

describe("UserStory: Login", () => {
  let loginData;

  before(async () => {
    loginData = await cy.fixture("penguin/logindata.json");
    // console.log(`loginData` + loginData.username, loginData.password);
  });

  it.only(`should be able to login with valid credentials`, function () {
    cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
      loginData.appID
    );
  });
});
