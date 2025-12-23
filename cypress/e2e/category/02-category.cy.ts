describe("Dashboard Category Tree", () => {
  beforeEach(() => {
    cy.viewport(1800, 1000);

    cy.setCookie("access_token", "fake-access-token");

    cy.intercept("GET", "/categories*", (req) => {
      const parentId = req.query.parentId;

      if (!parentId || parentId === "null") {
        req.reply({
          success: true,
          data: [
            { id: 1, name: "دیجیتال", level: 1 },
            { id: 2, name: "پوشاک", level: 1 },
          ],
        });
        return;
      }

      if (parentId === "1") {
        req.reply({
          success: true,
          data: [
            { id: 11, name: "موبایل", level: 2 },
            { id: 12, name: "لپ‌تاپ", level: 2 },
          ],
        });
        return;
      }

      req.reply({ success: true, data: [] });
    }).as("getCategories");

    cy.visit("/dashboard");
  });

  it("renders root categories", () => {
    cy.get("[data-cy='category-node-1']").should("be.visible");
    cy.get("[data-cy='category-node-2']").should("be.visible");
  });

  it("loads children when root expands", () => {
    cy.get("[data-cy='category-node-1']").click();
    cy.wait("@getCategories");
    cy.get("[data-cy='category-node-11']").should("be.visible");
    cy.get("[data-cy='category-node-12']").should("be.visible");
  });
});
