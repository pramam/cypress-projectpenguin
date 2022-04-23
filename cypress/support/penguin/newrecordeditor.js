/// <reference types="cypress" />

Cypress.Commands.add("writeInEditor", (text) => {
  // //body[@id='tinymce']
  cy.xpath('//body[@id="tinymce"]').type(text);
});
