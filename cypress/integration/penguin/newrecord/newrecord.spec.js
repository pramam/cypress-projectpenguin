/// <reference types="cypress" />

describe("UserStory: Create New Record", () => {
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

  it(`save button should not be visible if you have not typed into the form`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
        loginData.appID
      );
      cy.clickOnNewRecord();
      cy.ensureOnNewRecordPage();

      cy.saveButtonShouldNotBeVisible();
    });
  });

  it(`saving without inputting mandatory fields should show errors`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");

    cy.get("@loginData").then((loginData) => {
      cy.login(loginData.username, loginData.password).ensureOnLoggedInPage(
        loginData.appID
      );
      cy.clickOnNewRecord();
      cy.ensureOnNewRecordPage();

      cy.inputTelephone("444-444-4444");

      cy.clickSaveRecord();
      cy.checkModalSaveTimeSpent("1h 33s");

      cy.checkMandatoryFieldErrors(3);
    });
  });
});
// TODO: Submit record with optional data only
// TODO: Type data in an input field to get the Save button to be visible. Then delete the inputs and submit an empty record.
// TODO: Input empty string in SaveTimeSpent modal
// TODO: zip should not allow non numbers.
// TODO: API POST: Go beyond boundaries of Zip (max: 9007199254740991 min: -9007199254740991)
