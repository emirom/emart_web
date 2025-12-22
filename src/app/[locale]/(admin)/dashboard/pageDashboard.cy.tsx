import React from "react";
import Dashboard from "./page";

describe("<Dashboard />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dashboard />);
  });
});
