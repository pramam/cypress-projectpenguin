/// <reference types="cypress" />

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");

  cy.get('[data-cy="username__input"]').type(username);
  cy.get('[data-cy="password__input"]').type(password);
  cy.get('[data-cy="submit__btn"]').click();
});

Cypress.Commands.add(
  "cannotLoginWithMissingUsernameOrPassword",
  (username, password) => {
    cy.visit("/");

    if (username !== "") cy.get('[data-cy="username__input"]').type(username);
    if (password !== "") cy.get('[data-cy="password__input"]').type(password);
    cy.get('[data-cy="submit__btn"]').should("be.disabled");
  }
);
Cypress.Commands.add("ensureOnLoggedInPage", (appID) => {
  cy.url().should("eq", Cypress.config().baseUrl + "/welcome");

  cy.get('[data-cy="title__text"]').should(
    "have.text",
    "Complete Your Profile"
  );

  cy.get(`a[href="/search/${appID}/"]`).should("be.visible");
});

Cypress.Commands.add("ensureUserIsLoggedOut", () => {
  cy.get('[ng-if="header"]').should("have.text", "You've Been Logged Out");
});

Cypress.Commands.add("logout", () => {
  // Click on Avatar circle
  cy.get('span[class="acronym"]').click();
  // Click on logout
  cy.get('a[href="logout"]').click();
});

Cypress.Commands.add("ensureUserIsLoggedOutFromUI", () => {
  cy.url().should("eq", Cypress.config().baseUrl + "/logout");
  cy.get('[data-cy="logout__msg"]').should(
    "have.text",
    "You have successfully logged out"
  );
});
