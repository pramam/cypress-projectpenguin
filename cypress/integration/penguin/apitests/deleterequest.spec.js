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
    // We are going to do the following:
    // - POST /app/{appId}/record  <a record with all UI fields> (meaning all fields that one can create using the UI)
    // - Validate response of POST with `POSTvalidatefull`
    // - Get the record id of the new record from the POST response
    // - Validate the response of GET with `POSTvalidatefull`
    // - Delete this new record using its id: DELETE /app/{appId}/record/{id}
    // - Now do a GET /app/{appId}/record/{id} and we should get a 400 BAD REQUEST response as the
    //   record has already been deleted
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/alluifields.json").as("postBody");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody).then((postres) => {
            expect(postres.status).to.eq(HTTP_CODES.OK);

            cy.POSTvalidatefull(postres, postBody).then((validateres) => {
              console.log(`POSTvalidatebody succeeded`);

              // // Check that the post request has the right values
              // let postresbodyvalues = postres.body.values;
              // // console.log(postBody.values.aHdR_gHQmRT8ItVTL);
              // expect(postresbodyvalues).has.property(
              //   RECORD_KEYS.RK_FIRST_NAME,
              //   postBody.values.aHdR_gHQmRT8ItVTL
              // );
              // expect(postresbodyvalues).has.property(
              //   RECORD_KEYS.RK_LAST_NAME,
              //   postBody.values.aHxOeHmCTIGd_hg1b
              // );
              // expect(postresbodyvalues).has.property(
              //   RECORD_KEYS.RK_CITY,
              //   postBody.values.aFjm80LnbJf780V6p
              // );
              let resbody = validateres.body;
              console.log(resbody);
              let newrecordID = postres.body.id;
              console.log(`NEW RECORD ID: ${newrecordID}`);

              cy.GETrecordbyid(appData, loginData, newrecordID).then(
                (getres) => {
                  console.log(getres.status);
                  expect(getres.status).to.eq(HTTP_CODES.OK);

                  // Let's see if POSTvalidatefull can validate the GET response
                  cy.POSTvalidatefull(getres, postBody).then(
                    (getvalidatedres) => {
                      console.log(
                        `GET record successfully validated by POSTvalidatefull`
                      );
                      cy.DELETErecordbyid(appData, loginData, newrecordID).then(
                        (deleteres) => {
                          console.log(`DELETE status: ${deleteres.status}`);
                          expect(deleteres.status).to.eq(HTTP_CODES.NO_CONTENT);

                          // Now GET the same record and it should not be found
                          cy.GETrecordbyid(
                            appData,
                            loginData,
                            newrecordID
                          ).then((getafterdeleteres) => {
                            expect(getafterdeleteres.status).to.eq(
                              HTTP_CODES.BAD_REQUEST
                            );
                          });
                        }
                      );
                    }
                  );
                }
              );
            });
          });

          /*.then((postres) => {
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
            */
        });
      });
    });
  });
});
