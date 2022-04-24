/// <reference types="cypress" />

import { HTTP_CODES } from "../../../utils/penguin/httpstatuscodes";
import { RECORD_KEYS } from "../../../utils/penguin/recordfields";

// import { data as dataMissingMandatoryFields } from "../../../testdata/penguin/missingmandatoryfields-hardcoded.json";

describe("UserStory: POST API", () => {
  it(`should get an error on POST request with missing mandatory fields`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");
    cy.fixture("penguin/testdata/missingmandatoryfields.json").as("postBody");

    let defaultRecordValueType =
      "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib";

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          // cy.log(`data: ${dataMissingMandatoryFields}`);
          // let bodyjson = JSON.stringify(dataMissingMandatoryFields);
          cy.request({
            method: "POST",
            url: `${appData.APIUrl}/app/${appData.appID}/record`,
            failOnStatusCode: false,
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + loginData.bearerToken,
              "Private-Token": loginData.privateToken,
            },
            // body: `${JSON.stringify(dataMissingMandatoryFields)}`,
            body: postBody,
            // body: {
            //   applicationId: `${appData.appID}`,
            //   values: {
            //     $type: defaultRecordValueType,
            //     // "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
            //     RecordName: "Record Value",
            //   },
            // },
          }).then((res) => {
            // console.log(res.status);
            // console.log(JSON.stringify(res));
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

    let defaultRecordValueType =
      "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib";

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.get("@postBody").then((postBody) => {
          // cy.log(`data: ${dataMissingMandatoryFields}`);
          // let bodyjson = JSON.stringify(dataMissingMandatoryFields);

          cy.request({
            method: "POST",
            url: `${appData.APIUrl}/app/${appData.appID}/record`,
            failOnStatusCode: false,
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + loginData.bearerToken,
              "Private-Token": loginData.privateToken,
            },
            // body: `${JSON.stringify(dataMissingMandatoryFields)}`,
            body: postBody,
            // body: {
            //   applicationId: `${appData.appID}`,
            //   values: {
            //     $type: defaultRecordValueType,
            //     // "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
            //     aHdR_gHQmRT8ItVTL: "Post2FirstName",
            //     aHxOeHmCTIGd_hg1b: "Post2LastName",
            //     aFjm80LnbJf780V6p: "Post2City",
            //   },
            // },
          })
            .then((res) => {
              console.log(res.status);
              // cy.log("============================");
              // console.log(JSON.stringify(res));
              expect(res.status).to.eq(HTTP_CODES.OK);
              // expect(res.body).has.property("ErrorCode", 5008);
              // expect(res.body).has.property(
              //   "Argument",
              //   "Field City must have value.\r\nField First Name must have value.\r\nField Last Name must have value."
              // );
            })
            .then((res) => {
              // let responseObj = res.json();
              // cy.log(responseObj.data);
              let resbody = res.body;
              console.log(resbody);
              let newrecordID = res.body.id;
              console.log(`NEW RECORD ID: ${newrecordID}`);

              cy.request({
                method: "GET",
                url: `${appData.APIUrl}/app/${appData.appID}/record/${newrecordID}`,
                headers: {
                  accept: "application/json",
                  Authorization: "Bearer " + loginData.bearerToken,
                  "Private-Token": loginData.privateToken,
                },
              }).then((res) => {
                console.log(res.status);
                let resbodyvalues = res.body.values;
                console.log(postBody.values.aHdR_gHQmRT8ItVTL);
                expect(resbodyvalues).has.property(
                  "aHdR_gHQmRT8ItVTL", // First Name
                  postBody.values.aHdR_gHQmRT8ItVTL
                );
                expect(resbodyvalues).has.property(
                  "aHxOeHmCTIGd_hg1b", // Last Name
                  postBody.values.aHxOeHmCTIGd_hg1b
                );
                expect(resbodyvalues).has.property(
                  "aFjm80LnbJf780V6p", // City
                  postBody.values.aFjm80LnbJf780V6p
                );
                // Hack for now
                cy.writeFile(
                  `temp/${appData.recordID}-GET-output.json`,
                  res.body
                );
              });
            });
        });
      });
    });
  });
});
