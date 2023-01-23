describe("Create New Project." + Date().toLocaleString(), () => {
  it("EX-3332 - Create a projct in General Contractor Company as Project Manageer." + Date().toLocaleString(), function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.warn(err);
      if (err.message && err.message.startsWith("Uncaught Error: [OneDriveSDK Error]")) {
          cy.log('Cypress detected uncaught exception: ', err);
          return false;
      }
      return false
    })

    cy.visit("/auth/login?redirect=/");
      cy.log("Logging in General Contractor Company as PM.") 
       
      cy.get("#username").last().should("exist").last().clear({force: true}).last().type(Cypress.env("USERNAME"));
      cy.get("button[name=action]").first().should("exist").click();

      cy.get("#password").last().should("exist").last().clear({force: true}).last().type(Cypress.env("PASSWORD"));
      cy.get("button[name=action]").first().should("exist").click();

      cy.log("Logged in GC Company as PM.")
      cy.log("Creating project.")

      cy.get("button[data-cy='add-new-button']").first().should("exist").click();
      cy.get("li:nth-child(1) div:nth-child(1)").first().should("exist").click();
      cy.get("#title").should("exist").first().clear({force: true}).first().type("12.03.0");
      cy.get("#address").should("exist").first().clear({force: true}).first().type("123 Test Street");
      cy.get("#city").should("exist").first().clear({force: true}).first().type("Test City");
      cy.get(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-fullWidth").first().should("exist").click({ force: true,  multiple: true });
     
      cy.log('Wait for the object [' + "div[role='alert']" + 'with text' + "Succesfully created project!" + ' to show up.');
      cy.get("div[role='alert']").contains("Succesfully created project!").should('exist');
      //cy.get("div[role='alert']").should('have.text', "Succesfully created project!")
      cy.log('Wait for the object [' + "div[role='alert']" + '] to close.');
      cy.get("div[role='alert']").contains("Succesfully created project!").should('not.exist');
      
      // cy.get("div[role='alert']")
      // cy.contains("div[role='alert']","Succesfully created project!").should('not.exist')
  });
});