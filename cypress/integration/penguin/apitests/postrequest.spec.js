/// <reference types="cypress" />

import { HTTP_CODES } from "../../../utils/penguin/httpstatuscodes";
// import { data as dataMissingMandatoryFields } from "../../../testdata/penguin/missingmandatoryfields";

describe("UserStory: POST API", () => {
  it(`should get an error on POST request with missing mandatory fields`, function () {
    cy.fixture("penguin/logindata.json").as("loginData");
    cy.fixture("penguin/appdata.json").as("appData");

    let defaultRecordValueType =
      "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib";

    cy.get("@loginData").then((loginData) => {
      cy.get("@appData").then((appData) => {
        cy.log(`data: ${dataMissingMandatoryFields}`);
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
          // body: bodyjson,
          body: {
            applicationId: `${appData.appID}`,
            values: {
              $type: defaultRecordValueType,
              // "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
              RecordName: "Record Value",
            },
          },
        }).then((res) => {
          console.log(res.status);
          console.log(JSON.stringify(res));
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
