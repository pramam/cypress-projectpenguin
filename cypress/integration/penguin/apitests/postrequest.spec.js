/// <reference types="cypress" />

import { HTTP_CODES } from "../../../utils/penguin/httpstatuscodes";
import { RECORD_KEYS } from "../../../utils/penguin/recordfields";

describe("UserStory: POST API", () => {
  it(`should get an error on POST request with missing mandatory fields`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/missingmandatoryfields.json").as("postBody");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody).then((res) => {
            expect(res.status).to.eq(HTTP_CODES.BAD_REQUEST);
            expect(res.body).has.property("ErrorCode", 5008);
            expect(res.body).has.property(
              "Argument",
              "Field City must have value.\r\nField First Name must have value.\r\nField Last Name must have value."
            );
          });
        });
      });
    });
  });

  it(`should be able to submit POST request with just mandatory fields/confirm with GET`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/mandatoryfields.json").as("postBody");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody)
            .then((postres) => {
              // console.log(postres.status);
              // cy.log("============================");
              // console.log(JSON.stringify(postres));
              expect(postres.status).to.eq(HTTP_CODES.OK);

              // Check that the post request has the right values
              let postresbodyvalues = postres.body.values;
              // console.log(postBody.values.aHdR_gHQmRT8ItVTL);
              expect(postresbodyvalues).has.property(
                RECORD_KEYS.RK_FIRST_NAME,
                postBody.values.aHdR_gHQmRT8ItVTL
              );
              expect(postresbodyvalues).has.property(
                RECORD_KEYS.RK_LAST_NAME,
                postBody.values.aHxOeHmCTIGd_hg1b
              );
              expect(postresbodyvalues).has.property(
                RECORD_KEYS.RK_CITY,
                postBody.values.aFjm80LnbJf780V6p
              );
            })
            .then((postres) => {
              let resbody = postres.body;
              console.log(resbody);
              let newrecordID = postres.body.id;
              console.log(`NEW RECORD ID: ${newrecordID}`);

              cy.request({
                method: "GET",
                url: `${appData.APIUrl}/app/${appData.appID}/record/${newrecordID}`,
                headers: {
                  accept: "application/json",
                  Authorization: "Bearer " + loginData.bearerToken,
                  "Private-Token": loginData.privateToken,
                },
              }).then((getres) => {
                console.log(getres.status);
                let getresbodyvalues = getres.body.values;
                console.log(postBody.values.aHdR_gHQmRT8ItVTL);
                expect(getresbodyvalues).has.property(
                  "aHdR_gHQmRT8ItVTL", // First Name
                  postBody.values.aHdR_gHQmRT8ItVTL
                );
                expect(getresbodyvalues).has.property(
                  "aHxOeHmCTIGd_hg1b", // Last Name
                  postBody.values.aHxOeHmCTIGd_hg1b
                );
                expect(getresbodyvalues).has.property(
                  "aFjm80LnbJf780V6p", // City
                  postBody.values.aFjm80LnbJf780V6p
                );
                // TODO: Clean this up
                // Hack for now
                cy.writeFile(
                  `temp/${newrecordID}-GET-output.json`,
                  getres.body
                );
              });
            });
        });
      });
    });
  });
});
