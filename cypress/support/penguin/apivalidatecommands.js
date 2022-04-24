/// <reference types="cypress" />

import { RECORD_KEYS } from "../../utils/penguin/recordfields";

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
  // without this return the .then chained on POSTvalidate is unable to get the original response
  return response;
});
