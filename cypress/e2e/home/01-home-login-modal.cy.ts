describe("OTP + Login Flow - Full Success Mock (Swagger Compatible)", () => {
  it("should login successfully using mocked otp and login apis", () => {
    cy.viewport(1800, 1000);
    cy.visit("/");

    // Open login modal
    cy.get("[data-cy='open-login-modal']").click();
    cy.get("[data-cy='dialog-content']").should("be.visible");

    // ================= OTP API =================
    cy.intercept("POST", "**/auth/otp", (req) => {
      cy.wrap(req.body).should("deep.equal", {
        phone: "09123456789",
      });

      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: {
            sent: true,
          },
        },
      });
    }).as("sendOtp");

    cy.get('[data-cy="otp-input"]').type("09123456789");
    cy.get('[data-cy="submit-otp"]').click();

    // ================= LOGIN API =================
    cy.intercept("POST", "**/auth/login", (req) => {
      cy.wrap(req.body).should("deep.equal", {
        phone: "09123456789",
        otp: "123456",
      });

      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: {
            user: {
              phone: "09123456789",
            },
            tokens: {
              accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-access",
              refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-refresh",
            },
          },
        },
      });
    }).as("login");

    // Enter OTP and submit
    cy.get('[data-cy="otp-input"]').type("123456");
    cy.get('[data-cy="submit-otp"]').click();
  });
});
