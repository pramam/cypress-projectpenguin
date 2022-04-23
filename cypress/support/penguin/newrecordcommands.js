/// <reference types="cypress" />

Cypress.Commands.add("clickOnNewRecord", () => {
  // //ngx-icon[@tooltiptitle='New Record']
  cy.get('ngx-icon[tooltiptitle="New Record"]').click();
});

Cypress.Commands.add("ensureOnNewRecordPage", () => {
  // //span[@ng-if='isNewRecord']
  cy.get('span[ng-if="isNewRecord"]').should("have.text", "New Record");
});

Cypress.Commands.add("inputFirstName", (fname) => {
  // aHdR_gHQmRT8ItVTL
  cy.get('input[name="aHdR_gHQmRT8ItVTL"]').type(fname);
});

Cypress.Commands.add("inputLastName", (lname) => {
  // aHxOeHmCTIGd_hg1b
  cy.get('input[name="aHxOeHmCTIGd_hg1b"]').type(lname);
});

// Cypress.Commands.add("checkLastName", (lname) => {
//   // aHxOeHmCTIGd_hg1b
//   cy.get('input[name="aHxOeHmCTIGd_hg1b"]').should((el) => {
//     const text = el.text();
//     expect(text).to.equal(lname);
//   });
// });

Cypress.Commands.add("inputCity", (city) => {
  // aFjm80LnbJf780V6p
  cy.get('input[name="aFjm80LnbJf780V6p"]').type(city);
});

Cypress.Commands.add("saveButtonShouldBeVisible", () => {
  cy.get('button[ng-click="click(tool)"]').should("be.visible");
});

Cypress.Commands.add("clickSaveRecord", () => {
  //   cy.get('button[ng-click="click(tool)"]').click();
  //span[@ng-bind='tool.name'] Should have text Save
  cy.get('span[ng-bind="tool.name"]').contains("Save").click();
});

Cypress.Commands.add("checkModalSaveTimeSpent", (time) => {
  cy.get('h3[ng-if="header"]').contains("Time Spent");
  cy.get('input[ng-model="options.data"]').clear().type(time);
  // //button[@ng-click='click(button)']
  cy.get('button[ng-click="click(button)"]').click();
});

Cypress.Commands.add("checkRecordSavedPopup", () => {
  // Record Saved green rectangle should be visible momentarily
  //    //span[@ng-bind='noti.title']Record saved
  cy.get('span[ng-bind="noti.title"').contains("Record saved");
});

Cypress.Commands.add("getAndCheckNewlyCreatedRecordName", () => {
  cy.get('[class="record-header-link"]').should((el) => {
    const text = el.text();
    expect(text).to.match(/NES/);
  });

  //button[@ng-click='onCopyLinkNotification()']
  cy.get('button[ng-click="onCopyLinkNotification()"]').click({ force: true });
  // get data from the clipboard, doesn't work on all browsers
  // https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/testing-dom__clipboard
  //
  // We want the URL and to check the appID from it matches our appID from logindata.json

  //span[@data-cypress-el='true']
  //   cy.get('span[data-cypress-el="true"]').should((el) => {
  //     const text = el.text();

  //     expect(text).to.match(/NES/);
  //   });
  // Get Newly created record name
  // //span[@class='record-header-link']
  //   cy.get('span[class="record-header-link"]').trigger("mouseover");
  //   cy.get("button").contains("Copy Link").click();
});
