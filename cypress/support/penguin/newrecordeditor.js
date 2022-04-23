/// <reference types="cypress" />

// From here:
// https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
const getIframeDocument = () => {
  // the id of the iframe is changing on every run
  return (
    cy
      // .get("iframe")
      .get('[title="Rich Text Area. Press ALT-0 for help."]')
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its("0.contentDocument")
      .should("exist")
  );
};

const getIframeBody = () => {
  // get the document
  return (
    getIframeDocument()
      // automatically retries until body is loaded
      .its("body")
      .should("not.be.undefined")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  );
};

// TODO: Look at this later
Cypress.Commands.add("writeInEditor", (text) => {
  // //body[@id='tinymce']
  // cy.xpath('//body[@id="tinymce"]').type(text);

  getIframeBody().its("id"); // get("#tinymce"); //.should('have.text', 'Try it').click()
});
