/// <reference types="cypress" />

import { HTTP_CODES } from "../../../utils/penguin/httpstatuscodes";
import { RECORD_KEYS } from "../../../utils/penguin/recordfields";

describe("UserStory: DELETE API", () => {
  it(`should be safe to delete an invalid record id`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note the invalid recordID
        cy.DELETErecordbyid(appData, loginData, "\\\\\\\\\\\\\\\\\\").then(
          (deleteres) => {
            console.log(`DELETE status: ${deleteres.status}`);
            console.log(deleteres.body);
            expect(deleteres.status).to.eq(HTTP_CODES.NO_CONTENT);
          }
        );
      });
    });
  });

  it(`should be safe to delete an empty record id`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note the empty
        cy.DELETErecordbyid(appData, loginData, "").then((deleteres) => {
          console.log(`DELETE status: ${deleteres.status}`);
          console.log(deleteres.body);
          expect(deleteres.status).to.eq(HTTP_CODES.NO_CONTENT);
        });
      });
    });
  });

  it(`should be able to delete record by id (mandatory fields)`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/mandatoryfields.json").as("postBody");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody)
            .then((postres) => {
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

              cy.GETrecordbyid(appData, loginData, newrecordID).then(
                (getres) => {
                  console.log(getres.status);
                  expect(getres.status).to.eq(HTTP_CODES.OK);

                  let getresbodyvalues = getres.body.values;
                  console.log(postBody.values.aHdR_gHQmRT8ItVTL);
                  expect(getresbodyvalues).has.property(
                    RECORD_KEYS.RK_FIRST_NAME,
                    postBody.values.aHdR_gHQmRT8ItVTL
                  );
                  expect(getresbodyvalues).has.property(
                    RECORD_KEYS.RK_LAST_NAME,
                    postBody.values.aHxOeHmCTIGd_hg1b
                  );
                  expect(getresbodyvalues).has.property(
                    RECORD_KEYS.RK_CITY,
                    postBody.values.aFjm80LnbJf780V6p
                  );
                  cy.DELETErecordbyid(appData, loginData, newrecordID).then(
                    (deleteres) => {
                      console.log(`DELETE status: ${deleteres.status}`);
                      expect(deleteres.status).to.eq(HTTP_CODES.NO_CONTENT);

                      // Now GET the same record and it should not be found
                      cy.GETrecordbyid(appData, loginData, newrecordID).then(
                        (getafterdeleteres) => {
                          expect(getafterdeleteres.status).to.eq(
                            HTTP_CODES.BAD_REQUEST
                          );
                        }
                      );
                    }
                  );
                }
              );
            });
        });
      });
    });
  });

  it.only(`should be able to delete record by id (all UI fields)`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/alluifields.json").as("postBody");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody)
            .then((postres) => {
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

              cy.GETrecordbyid(appData, loginData, newrecordID).then(
                (getres) => {
                  console.log(getres.status);
                  expect(getres.status).to.eq(HTTP_CODES.OK);

                  let getresbodyvalues = getres.body.values;
                  console.log(postBody.values.aHdR_gHQmRT8ItVTL);
                  expect(getresbodyvalues).has.property(
                    RECORD_KEYS.RK_FIRST_NAME,
                    postBody.values.aHdR_gHQmRT8ItVTL
                  );
                  expect(getresbodyvalues).has.property(
                    RECORD_KEYS.RK_LAST_NAME,
                    postBody.values.aHxOeHmCTIGd_hg1b
                  );
                  expect(getresbodyvalues).has.property(
                    RECORD_KEYS.RK_CITY,
                    postBody.values.aFjm80LnbJf780V6p
                  );
                  cy.DELETErecordbyid(appData, loginData, newrecordID).then(
                    (deleteres) => {
                      console.log(`DELETE status: ${deleteres.status}`);
                      expect(deleteres.status).to.eq(HTTP_CODES.NO_CONTENT);

                      // Now GET the same record and it should not be found
                      cy.GETrecordbyid(appData, loginData, newrecordID).then(
                        (getafterdeleteres) => {
                          expect(getafterdeleteres.status).to.eq(
                            HTTP_CODES.BAD_REQUEST
                          );
                        }
                      );
                    }
                  );
                }
              );
            });
        });
      });
    });
  });

});
