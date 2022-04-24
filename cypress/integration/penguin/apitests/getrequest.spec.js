/// <reference types="cypress" />

import { HTTP_CODES } from "../../../utils/penguin/httpstatuscodes";
import {
  RECORD_KEYS,
  GET_RESPONSE_EMPTY_TYPE_STRING,
} from "../../../utils/penguin/recordfields";

describe("UserStory: GET API", () => {
  // This test checks a specific record for the specific user
  // update /cypress/fixtures/penguin/logindata.json with a "recordID"  containing your record's ID
  // This test uses that recordID
  // You will also need to modify the verification lines in this code for it to work
  // as it checks for hardcoded First Name, Last Name, City
  it(`should be able to make a GET request for a particular hardcoded record`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.GETrecordbyid(appData, loginData, loginData.recordID).then((res) => {
          console.log(res.status);
          expect(res.status).to.eq(HTTP_CODES.OK);

          let resbodyvalues = res.body.values;
          console.log(res.body.values);
          console.log(
            "If this test fails you need to update hardcoded values in the test"
          );
          // IMP: Edit "Sarah", "Doe", "Paris" with your values
          // for this test to work
          expect(resbodyvalues).has.property(
            RECORD_KEYS.RK_FIRST_NAME,
            "Sarah"
          );
          expect(resbodyvalues).has.property(
            RECORD_KEYS.RK_LAST_NAME,
            "Doe" // This is what was entered in the form, it comes back as DOE which is why the test is failing
            //"Doe".toUpperCase() works
          );
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_CITY, "Paris");
        });
      });
    });
  });

  it(`GET request for empty record ID should return empty fields`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note the empty recordID
        cy.GETrecordbyid(appData, loginData, "").then((res) => {
          console.log(res.status);
          expect(res.status).to.eq(HTTP_CODES.OK);

          let resbodyvalues = res.body.values;

          console.log(resbodyvalues);
          // TODO: Check for number of fields in value object, should be 10
          expect(resbodyvalues).has.property(
            RECORD_KEYS.RK_$TYPE,
            GET_RESPONSE_EMPTY_TYPE_STRING
          );
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_CITY, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_UNKNOWN1, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_EMAIL, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_FIRST_NAME, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_LAST_NAME, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_STATE, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_STREET_ADDRESS, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_TELEPHONE, "");
          expect(resbodyvalues).has.property(RECORD_KEYS.RK_TEXT_BOX, "");
        });
      });
    });
  });

  it(`GET request with invalid bearer token should give error`, function () {
    cy.fixture("penguin/logindatainvalidbearertoken.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note the empty recordID
        cy.GETrecordbyid(appData, loginData, "").then((res) => {
          console.log(res.status);
          console.log(res.body);
          expect(res.status).to.eq(HTTP_CODES.UNAUTHORIZED);
        });
      });
    });
  });

  it(`GET request with invalid private token should give error`, function () {
    cy.fixture("penguin/logindatainvalidprivatetoken.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note the empty recordID
        cy.GETrecordbyid(appData, loginData, "").then((res) => {
          console.log(res.status);
          console.log(res.body);
          expect(res.status).to.eq(HTTP_CODES.UNAUTHORIZED);
        });
      });
    });
  });

  it(`GET request for invalid record ID should give empty record`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note the invalid recordID
        cy.GETrecordbyid(appData, loginData, "\\\\\\\\\\\\\\\\\\\\\\\\\\").then(
          (res) => {
            console.log(res.status);
            expect(res.status).to.eq(HTTP_CODES.OK);

            let resbodyvalues = res.body.values;

            console.log(resbodyvalues);
            // TODO: Check for number of fields in value object, should be 10
            expect(resbodyvalues).has.property(
              RECORD_KEYS.RK_$TYPE,
              GET_RESPONSE_EMPTY_TYPE_STRING
            );
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_CITY, "");
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_UNKNOWN1, "");
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_EMAIL, "");
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_FIRST_NAME, "");
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_LAST_NAME, "");
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_STATE, "");
            expect(resbodyvalues).has.property(
              RECORD_KEYS.RK_STREET_ADDRESS,
              ""
            );
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_TELEPHONE, "");
            expect(resbodyvalues).has.property(RECORD_KEYS.RK_TEXT_BOX, "");
          }
        );
      });
    });
  });
});
