describe("Create Category Page", () => {
  beforeEach(() => {
    cy.viewport(1800, 1000);
    cy.setCookie("access_token", "fake-access-token");

    cy.intercept("GET", "/categories*", {
      success: true,
      data: [
        { id: 1, name: "دیجیتال" },
        { id: 2, name: "پوشاک" },
      ],
    }).as("getCategories");

    cy.intercept("GET", "/units*", {
      success: true,
      data: [
        { id: 1, title: "عدد" },
        { id: 2, title: "کیلو" },
      ],
    }).as("getUnits");

    cy.intercept("POST", "/categories*", (req) => {
      expect(req.body).to.deep.equal({
        name: "موبایل",
        enName: "mobile",
        parentId: 1,
        unitId: 1,
        desc: "دسته بندی موبایل",
        isActive: true,
        showInMenu: true,
        iconUrl: "https://example.com/icon.png",
        promotionId: null,
      });

      req.reply({
        success: true,
        data: { id: 123, name: req.body.name },
      });
    }).as("postCategory");

    cy.visit("/dashboard/category/add");
  });

  it("renders form correctly", () => {
    cy.get("[data-cy='input-name']").should("be.visible");
    cy.get("[data-cy='input-enName']").should("be.visible");
    cy.get("[data-cy='input-desc']").should("be.visible");
    cy.get("[data-cy='select-parent']").should("be.visible");
    cy.get("[data-cy='select-unit']").should("be.visible");
    cy.get("[data-cy='switch-isActive']").should("be.visible");
    cy.get("[data-cy='switch-showInMenu']").should("be.visible");
    cy.get("[data-cy='submit-category']").should("exist");
  });

  it("fills and submits the form successfully", () => {
    cy.get("[data-cy='input-name']").type("موبایل");
    cy.get("[data-cy='input-enName']").type("mobile");
    cy.get("[data-cy='input-desc']").type("دسته بندی موبایل");

    cy.get("[data-cy='select-parent']").click();
    cy.contains("دیجیتال").click();

    cy.get("[data-cy='select-unit']").click();
    cy.contains("عدد").click();

    cy.get("[data-cy='switch-isActive']").click({ force: true });
    cy.get("[data-cy='switch-showInMenu']").click({ force: true });

    cy.get("[data-cy='submit-category']").click();

    // cy.contains("دسته بندی اضافه شد").should("be.visible");

    // cy.get("[data-cy='input-name']").should("have.value", "");
    // cy.get("[data-cy='input-enName']").should("have.value", "");
    // cy.get("[data-cy='input-desc']").should("have.value", "");
    // cy.get("[data-cy='switch-isActive']").should("exist");
    // cy.get("[data-cy='switch-showInMenu']").should("exist");
  });
});
