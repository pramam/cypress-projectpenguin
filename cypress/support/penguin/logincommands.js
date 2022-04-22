Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");

  cy.get('[data-cy="username__input"]').type(username);
  cy.get('[data-cy="password__input"]').type(password);
  cy.get('[data-cy="submit__btn"]').click();
});

Cypress.Commands.add("ensureOnLoggedInPage", (appID) => {
  cy.url().should("eq", Cypress.config().baseUrl + "/welcome");

  cy.get('[data-cy="title__text"]').should(
    "have.text",
    "Complete Your Profile"
  );

  cy.get(`a[href="/search/${appID}/"]`).should("exist");
});
