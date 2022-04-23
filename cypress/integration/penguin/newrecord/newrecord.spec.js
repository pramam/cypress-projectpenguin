/// <reference types="cypress" />

describe("UserStory: Create New Record", () => {
  //   let loginData;

  //   before(async () => {
  //     loginData = await cy.fixture("penguin/logindata.json");
  //     // console.log(`loginData` + loginData.username, loginData.password);
  //   });

  before(function () {
    // cy.fixture("penguin/logindata.json").as("loginData");
  });
  // TODO: Add login to the before block
  it(`click on new record and ensure form is displayed`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
        loginData.appID
      );
      cy.clickOnNewRecord();
      cy.ensureOnNewRecordPage();
    });
  });

  it(`input mandatory information and submit new record successfully`, function () {
    // cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
    //   loginData.appID
    // );
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
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

  it(`input all information and submit new record successfully`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
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

      cy.inputStreetAddress("1234 Main Street");
      cy.inputState("California");

      cy.inputTelephone("444-444-4444");
      cy.inputZip("94567");
      cy.inputEmail("helloworld@gmail.com");
      cy.inputText("dummy text");
      cy.selectStatusFullTime();
      // TODO: cy.selectStatusPartTime();
      // TODO: cy.selectStatusIntern();

      cy.selectDepartmentEngineering();

      // TODO: Selecting other departments
      cy.selectBenefits401K();
      cy.selectFavoriteBand();
      // TODO: Does not work
      // cy.writeInEditor("Writing a paragraph in editor");

      cy.clickSaveRecord();
      cy.checkModalSaveTimeSpent("1h 33s");
      cy.checkRecordSavedPopup();

      cy.getAndCheckNewlyCreatedRecordName();

      // TODO: Check the typed in input
    });
  });

  it(`typing in a non-mandatory field in the form should show save button`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
        loginData.appID
      );
      cy.clickOnNewRecord();
      cy.ensureOnNewRecordPage();

      // As soon as you enter a field the Save button should be visible
      cy.inputTelephone("444-444-4444");
      cy.saveButtonShouldBeVisible();
    });
  });
});
// Submit record with optional data only
// Submit record without any data
// input empty string in SaveTimeSpent modal
// zip should not allow non numbers: max: 9007199254740991 min: -9007199254740991
