/// <reference types="cypress" />

describe("UserStory: Create New Record", () => {
  let loginData;

  before(async () => {
    loginData = await cy.fixture("penguin/logindata.json");
    // console.log(`loginData` + loginData.username, loginData.password);
  });

  // TODO: Add login to the before block
  it(`click on new record and ensure form is displayed`, function () {
    cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
      loginData.appID
    );
    cy.clickOnNewRecord();
    cy.ensureOnNewRecordPage();
  });

  it(`input mandatory information and submit new record successfully`, function () {
    cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
      loginData.appID
    );
    cy.clickOnNewRecord();
    cy.ensureOnNewRecordPage();

    cy.inputFirstName("hello");
    // As soon as you enter a field the Save button should be visible
    cy.saveButtonShouldBeVisible();
    cy.inputLastName("world");
    cy.inputCity("SFO");
    cy.clickSaveRecord();
    cy.checkModalSaveTimeSpent("1h 33s");
    cy.checkRecordSavedPopup();

    cy.getAndCheckNewlyCreatedRecordName();
    // cy.checkLastName("world");
  });
});

// Submit record with all data fields
// Submit record with optional data only
// Submit record without any data
// input empty string in SaveTimeSpent modal