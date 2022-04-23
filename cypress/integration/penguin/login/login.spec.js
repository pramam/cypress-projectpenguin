/// <reference types="cypress" />

describe("UserStory: Login and Logout Tests", () => {
  // let loginData;

  // before(async () => {
  //   loginData = await cy.fixture("penguin/logindata.json");
  //   // console.log(`loginData` + loginData.username, loginData.password);
  // });

  it(`should be able to login with valid credentials`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
        loginData.appID
      );
    });
  });

  it(`clearing the cookies should log you out`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
        loginData.appID
      );

      cy.clearCookies();
      cy.clearLocalStorage();
      // At this point LocalStorage and SessionStorage have
      // baseUrl on the left pane, but no key-value pairs stored as cookies

      // Now you should be logged out
      cy.ensureUserIsLoggedOut();
    });
  });

  it(`should be able to logout from the UI`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
        loginData.appID
      );

      cy.logout();
      cy.ensureUserIsLoggedOutFromUI();
    });
  });

  it(`should not be able to click on login when username and password are missing`, function () {
    cy.visit("/");

    cy.get('[data-cy="submit__btn"]').should("be.disabled");
  });

  it(`should not be able to click on login button with username present, password missing`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.cannotLoginWithMissingUsernameOrPassword(loginData.username, "");
    });
  });

  it(`should not be able to click on login button with username missing, password present`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.cannotLoginWithMissingUsernameOrPassword(loginData.username, "");
    });
  });

  // New tests to write:
  // Extra long username, find limit of characters
  // Extra long password, find limit of characters
  // Add special characters in username
  // Add special characters in password
});
