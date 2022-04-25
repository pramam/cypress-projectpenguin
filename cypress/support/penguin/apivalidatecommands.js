/// <reference types="cypress" />

import { RECORD_KEYS } from "../../utils/penguin/recordfields";

// This command validates all the fields in the `POST /app/{appId}/record` schema 
// that were input from the UI and stored for a POST message, and sent via the API
Cypress.Commands.add("POSTvalidatefull", (response, sent) => {
  let postresbodyvalues = response.body.values;
  // Validate mandatory values first
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_FIRST_NAME,
    sent.values.aHdR_gHQmRT8ItVTL
  );
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_LAST_NAME,
    sent.values.aHxOeHmCTIGd_hg1b
  );
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_CITY,
    sent.values.aFjm80LnbJf780V6p
  );
  // Now validate the other fields in response.body.values
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_EMAIL,
    sent.values.aGgc3qp6gt3dDR_na
  );
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_STATE,
    sent.values.aIaHwVkkr_seOK096
  );
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_STREET_ADDRESS,
    sent.values.aJDBDjjIFiTemxLGc
  );
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_TELEPHONE,
    sent.values.aJX7sLD3xZH9TlVps
  );
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_TEXT_BOX,
    sent.values.aJr4VxhqeQ4fAZgO7
  );
  expect(postresbodyvalues).has.property(
    RECORD_KEYS.RK_ZIP,
    sent.values.aKTyoAgO27gfZC0Vd
  );

  // Validate objects' values. Skipping on id investigation for now
  /* For instance, this is the json for Status (Full Time, Part Time, Intern)
   * "aIuEa7EWYrg958AiM": {
   * "$type": "Core.Models.Record.ValueSelection, Core",
   * "id": "5fe12636dba2b1e2425d9f8a",
   * "value": "Intern"
   * },
   * I will only be validating the value "Intern" for now.
   * TODO: Store "id" and validate it
   */
  // This is equivalent to the RK_STATUS code with to.have.deep.property below it, 
  // just for my reference
  expect(postresbodyvalues.aIuEa7EWYrg958AiM).has.property(
    "value",
    sent.values.aIuEa7EWYrg958AiM.value
  );
  expect(postresbodyvalues).to.have.deep.property(
    RECORD_KEYS.RK_STATUS,
    sent.values.aIuEa7EWYrg958AiM
  );
  expect(postresbodyvalues).to.have.deep.property(
    RECORD_KEYS.RK_BENEFITS,
    sent.values.aFPpUOs0uSrcRCKYZ
  );
  expect(postresbodyvalues).to.have.deep.property(
    RECORD_KEYS.RK_DEPARTMENT,
    sent.values.aGMfQEKK_1G7WdqEK
  );
  expect(postresbodyvalues).to.have.deep.property(
    RECORD_KEYS.RK_FAVORITE_BAND,
    sent.values.aHJVM3nf4afdc4Kv5
  );
  // TODO: Check a record with multiple comments
  let nocomments = response.body.comments.aIGLHuFzA948hVqar.length;
  console.log(
    `No Comments: ${response.body.comments.aIGLHuFzA948hVqar.length}`
  );
  for (let i = 0; i < nocomments; i++) {
    expect(response.body.comments.aIGLHuFzA948hVqar[i]).to.have.deep.property(
      "message",
      sent.comments.aIGLHuFzA948hVqar[i].message
    );
  }
  expect(response.body.sessionTimeSpent).to.equal(sent.sessionTimeSpent);

  expect(response.body.totalTimeSpent).to.equal(sent.sessionTimeSpent);

  // without this return the .then chained on POSTvalidate is unable to get the original response
  return response;
});
