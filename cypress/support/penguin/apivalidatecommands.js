/// <reference types="cypress" />

import { RECORD_KEYS } from "../../utils/penguin/recordfields";

Cypress.Commands.add("POSTvalidatefull", (response, sent) => {
  let postresbodyvalues = response.body.values;
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
  // without this return the .then chained on POSTvalidate is unable to get the original response
  return response;
});
