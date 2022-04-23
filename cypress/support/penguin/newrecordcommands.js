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

Cypress.Commands.add("inputStreetAddress", (streetaddress) => {
  // aJDBDjjIFiTemxLGc
  cy.get('textarea[name="aJDBDjjIFiTemxLGc"]').type(streetaddress);
});

Cypress.Commands.add("inputCity", (city) => {
  // aFjm80LnbJf780V6p
  cy.get('input[name="aFjm80LnbJf780V6p"]').type(city);
});

Cypress.Commands.add("inputState", (state) => {
  // aIaHwVkkr_seOK096
  cy.get('input[name="aIaHwVkkr_seOK096"]').type(state);
});

Cypress.Commands.add("inputTelephone", (telephone) => {
  // aJX7sLD3xZH9TlVps
  cy.get('input[name="aJX7sLD3xZH9TlVps"]').type(telephone);
});

Cypress.Commands.add("inputZip", (zip) => {
  // aKTyoAgO27gfZC0Vd
  cy.get('input[name="aKTyoAgO27gfZC0Vd"]').type(zip);
});

Cypress.Commands.add("inputEmail", (email) => {
  // aGgc3qp6gt3dDR_na
  cy.get('input[name="aGgc3qp6gt3dDR_na"]').type(email);
});

Cypress.Commands.add("inputText", (text) => {
  // aJr4VxhqeQ4fAZgO7
  cy.get('input[name="aJr4VxhqeQ4fAZgO7"]').type(text);
});

Cypress.Commands.add("selectStatusFullTime", () => {
  // aIuEa7EWYrg958AiM
  cy.get('input[name="aIuEa7EWYrg958AiM"]').first().check(); //check(" Full Time ");
  //   cy.get('[type="radio"]').check(" Full Time ");
});

// TODO: Not working
Cypress.Commands.add("selectStatusPartTime", () => {
  // aIuEa7EWYrg958AiM
  //   cy.get('input[name="aIuEa7EWYrg958AiM"]').second().check();
  cy.get('[value=" Part Time" ]').click();
  //   cy.get('input[name="aIuEa7EWYrg958AiM"]').first().next().check(); //check(" Full Time ");
});

// TODO: Not working
Cypress.Commands.add("selectStatusIntern", () => {
  console.log("TODO: Implement checking Intern radio button");
});

Cypress.Commands.add("selectDepartmentEngineering", () => {
  cy.get('input[name="aGMfQEKK_1G7WdqEK"]').first().check();
  // check this
  // https://stackoverflow.com/questions/55462097/cypress-to-test-radio-button-value
  // cy.get('input[name="aGMfQEKK_1G7WdqEK"]').then((input) => {
  //   const val = input.val();
  //   cy.log(JSON.stringify(val));
  // });

  // use jquery to click on second radio button
  // https://stackoverflow.com/questions/3914669/checking-a-radio-button-in-jquery
});

// TODO: Commands to select other Radio buttons not working
// Sales
// Accounting
// Products
// Custodial
// HR
// Marketing
// Other
// https://docs.cypress.io/api/commands/each#Yields

Cypress.Commands.add("selectBenefits401K", () => {
  cy.get('input[name="aFPpUOs0uSrcRCKYZ"]').first().check();
});

// TODO: Pass in parameter to select band with text
Cypress.Commands.add("selectFavoriteBand", () => {
  // multiSelect-aJewlbp6IcO21RQAO-aHJVM3nf4afdc4Kv5
  // cy.get('#multiSelect-aJewlbp6IcO21RQAO-aHJVM3nf4afdc4Kv5')
  //   .select(0)
  //   .should((el) => {
  //     const text = el.text();
  //     text.should("eq", "The Beatles");
  //   });

  // //li[@class='ui-select-choices-group']//li
  cy.get('a[aria-label="Select box select"]').click();
  cy.xpath('//li[@class="ui-select-choices-group"]//li[1]')
    .should("have.length", 1)
    .click();
});

// Text editor commands in cypress/support/penguin/newrecordeditor.js

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
