/// <reference types="cypress" />

import { HTTP_CODES } from "../../../utils/penguin/httpstatuscodes";
import { RECORD_KEYS } from "../../../utils/penguin/recordfields";

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
        // cy.request({
        //   method: "GET",
        //   url: `${appData.APIUrl}/app/${appData.appID}/record/${appData.recordID}`,
        //   headers: {
        //     accept: "application/json",
        //     Authorization: "Bearer " + loginData.bearerToken,
        //     "Private-Token": loginData.privateToken,
        //   },
        // });
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
            RECORD_KEYS.RK_FIRST_NAME, //"aHdR_gHQmRT8ItVTL", // First Name
            "Sarah"
          );
          expect(resbodyvalues).has.property(
            RECORD_KEYS.RK_LAST_NAME, //"aHxOeHmCTIGd_hg1b", // Last Name
            "Doe" // This is what was entered in the form, it comes back as DOE which is why the test is failing
            //"Doe".toUpperCase() works
          );
          expect(resbodyvalues).has.property(
            RECORD_KEYS.RK_CITY, //"aFjm80LnbJf780V6p", // City
            "Paris"
          );

          // Hack for now
          // cy.writeFile(`temp/${appData.recordID}-GET-output.json`, res.body);
          // cy.readFile(`temp/${appData.recordID}-GET-output.json`).then(
          //   (json) => {
          //     expect(json).to.be.an("object");
          //     cy.log(json.trackingFull);
          //   }
          // );
        });
      });
    });
  });
});
