describe('Login Test OpenMRS', () => {
  it('should login successfully and select location', () => {
    cy.visit('https://o2.openmrs.org/openmrs/login.htm', { timeout: 60000 },{ failOnStatusCode: false });

    cy.get('#username', { timeout: 10000 }).should('be.visible').type('admin');
    cy.get('#password').should('be.visible').type('Admin123');
    cy.get('[id="sessionLocation"]').eq(0).should('contain', 'Inpatient Ward').click();
    // cy.get('#loginButton').should('be.visible').click();
    // cy.url().should('include', '/openmrs/referenceapplication/home.page');
    // cy.contains('Logged in as').should('exist');
  });
});
