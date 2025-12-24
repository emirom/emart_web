// cypress/e2e/attributes/add-attribute.cy.ts
describe("CreateAttributeForm E2E", () => {
  beforeEach(() => {
    cy.setCookie("access_token", "fake-access-token");

    cy.intercept("GET", "/categories?skip=0&limit=10", {
      statusCode: 200,
      body: { data: [{ id: "1", name: "دسته تست" }] },
    }).as("getCategories");

    cy.intercept("GET", "/units?skip=0&limit=10", {
      statusCode: 200,
      body: { data: [{ value: "text", name: "متن" }] },
    }).as("getUnits");

    cy.visit("/dashboard/category/add");
    cy.wait("@getCategories");
    cy.wait("@getUnits");
    cy.clearLocalStorage();
  });

  it("should render all fields correctly", () => {
    cy.get("form").should("exist");
    cy.get('[data-cy="categoryId"]').should("exist");
    cy.get('[data-cy="title"]').should("exist");
    cy.get('[data-cy="unit"]').should("exist");
    cy.get('[data-cy="type"]').should("exist");
    cy.get('[data-cy="submit-button"]').should("exist").and("be.disabled");
  });

  it("should enable submit button when form is dirty", () => {
    cy.get('[data-cy="title"]').type("ابعاد");
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");
  });

  it("should submit form and show success toast", () => {
    cy.intercept("POST", "/api/attributes", {
      statusCode: 200,
      body: { message: "ویژگی اضافه شد" },
    }).as("createAttribute");

    cy.get('[data-cy="categoryId"]').click();
    cy.get(".autocomplete-option").first().click();
    cy.get('[data-cy="title"]').type("ابعاد");
    cy.get('[data-cy="unit"]').type("سانتی‌متر");
    cy.get('[data-cy="type"]').click();
    cy.get(".scrollable-select-option").contains("text").click();
    cy.get('[data-cy="submit-button"]').click();

    cy.wait("@createAttribute", { timeout: 10000 });
    cy.get(".Toastify__toast-body").should("contain.text", "ویژگی اضافه شد");
    cy.get('[data-cy="title"]').should("have.value", "");
    cy.get('[data-cy="unit"]').should("have.value", "");
  });

  it("should show error toast if action fails", () => {
    cy.intercept("POST", "/api/attributes", {
      statusCode: 500,
      body: { message: "خطایی رخ داد" },
    }).as("createAttributeError");

    cy.get('[data-cy="categoryId"]').click();
    cy.get(".autocomplete-option").first().click();
    cy.get('[data-cy="title"]').type("ابعاد");
    cy.get('[data-cy="unit"]').type("سانتی‌متر");
    cy.get('[data-cy="type"]').click();
    cy.get(".scrollable-select-option").contains("text").click();
    cy.get('[data-cy="submit-button"]').click();

    cy.wait("@createAttributeError", { timeout: 10000 });
    cy.get(".Toastify__toast-body").should("contain.text", "خطایی رخ داد");
  });
});
