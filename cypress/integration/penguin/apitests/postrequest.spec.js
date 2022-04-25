/// <reference types="cypress" />

import { HTTP_CODES } from "../../../utils/penguin/httpstatuscodes";
import { RECORD_KEYS } from "../../../utils/penguin/recordfields";

describe("UserStory: POST API", () => {
  it(`should get an error on POST request with empty body`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note: Empty body in POST
        cy.POSTrecord(appData, loginData, {}).then((res) => {
          console.log(res);

          expect(res.status).to.eq(HTTP_CODES.BAD_REQUEST);
          // There should be no body?
          // expect(res.body).to.eq("{}");
        });
      });
    });
  });

  it(`should get an error on POST with invalid media format`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        // Note: Junk in body
        cy.POSTrecord(appData, loginData, "\\\\\\\\\\\\\\\\\\\\\\").then(
          (res) => {
            console.log(res);

            expect(res.status).to.eq(HTTP_CODES.UNSUPPORTED_MEDIA_TYPE);
          }
        );
      });
    });
  });

  it(`should get an error on POST request with only appID in body`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/bodywithappidonly.json").as("postBody");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody).then((res) => {
            console.log(res);

            expect(res.status).to.eq(HTTP_CODES.BAD_REQUEST);
            // Missing mandatory fields
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

  it(`should get an error on POST request with only wrong appID in body`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/bodywithwrongappidonly.json").as("postBody");

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody).then((res) => {
            console.log(res);

            expect(res.status).to.eq(HTTP_CODES.BAD_REQUEST);
          });
        });
      });
    });
  });

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
              expect(postres.status).to.eq(HTTP_CODES.OK);

              // Check that the post request has the right values
              let postresbodyvalues = postres.body.values;
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
              // console.log(resbody);
              let newrecordID = postres.body.id;
              console.log(`NEW RECORD ID: ${newrecordID}`);

              cy.GETrecordbyid(appData, loginData, newrecordID).then(
                (getres) => {
                  console.log(getres.status);
                  expect(getres.status).to.eq(HTTP_CODES.OK);

                  let getresbodyvalues = getres.body.values;
                  // console.log(postBody.values.aHdR_gHQmRT8ItVTL);
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
                  // TODO: Clean this up
                  // Hack for now
                  // cy.writeFile(
                  //   `temp/${newrecordID}-GET-output.json`,
                  //   getres.body
                  // );
                }
              );
            });
        });
      });
    });
  });

  it(`should not be able to submit POST request without $type, with mandatory fields/confirm with GET`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/mandatoryfieldswithout$type.json").as(
      "postBody"
    );

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          cy.POSTrecord(appData, loginData, postBody)
            .then((postres) => {
              console.log(postres.body);
              // If you comment out the following line, the whole test will pass
              expect(postres.status).to.eq(HTTP_CODES.BAD_REQUEST);
              // But this test case works and goes through to completion
              expect(postres.status).to.eq(HTTP_CODES.OK);

              // Check that the post request has the right values
              let postresbodyvalues = postres.body.values;
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
              // console.log(resbody);
              let newrecordID = postres.body.id;
              console.log(`NEW RECORD ID: ${newrecordID}`);

              cy.GETrecordbyid(appData, loginData, newrecordID).then(
                (getres) => {
                  console.log(getres.status);
                  expect(getres.status).to.eq(HTTP_CODES.OK);

                  let getresbodyvalues = getres.body.values;
                  // console.log(postBody.values.aHdR_gHQmRT8ItVTL);
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
                  // Failing this test manually. Should not get here
                  expect(false).to.be.equal(true);
                }
              );
            });
        });
      });
    });
  });

  it(`should be able to submit POST request with ALL UI fields/confirm with GET`, function () {
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

              let newrecordID = validateres.body.id;
              console.log(
                `NEW RECORD ID after POSTvalidatebody: ${newrecordID}`
              );
              cy.GETrecordbyid(appData, loginData, newrecordID).then(
                (getres) => {
                  console.log(getres.status);
                  expect(getres.status).to.eq(HTTP_CODES.OK);

                  // Let's see if POSTvalidatefull can validate the GET response
                  cy.POSTvalidatefull(getres, postBody).then((validatedres) => {
                    console.log(
                      `GET record successfully validated by POSTvalidatefull`
                    );
                  });

                  return;
                  // TODO: Clean this up
                  // Hack for now, for faster debugging
                  cy.writeFile(
                    `temp/${newrecordID}-GET-output.json`,
                    getres.body
                  );
                }
              );
            });
          });
        });
      });
    });
  });
});
