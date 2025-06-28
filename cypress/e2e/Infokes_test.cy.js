describe('Login Test OpenMRS', () => {
  it('should login successfully and select location', () => {
    cy.visit('https://o2.openmrs.org/openmrs/login.htm', { timeout: 60000 },{ failOnStatusCode: false });

    cy.get('#username', { timeout: 10000 }).should('be.visible').type('admin');
    cy.get('#password').should('be.visible').type('Admin123');
    cy.get('[id="sessionLocation"]').eq(0).should('contain', 'Inpatient Ward').click();
    cy.get('#loginButton').should('be.visible').click();
    cy.url().should('include', '/openmrs/referenceapplication/home.page');
    cy.contains('Logged in as').should('exist');

    cy.get('[id="coreapps-activeVisitsHomepageLink-coreapps-activeVisitsHomepageLink-extension"]').click();
    cy.get('[id="patient-search-form"]').click().type('test');
    cy.get('[id="patient-search-form"]').clear();
    
    cy.intercept('GET','**/openmrs/coreapps/clinicianfacing/**').as('dataPasien');
    cy.get('[class="odd"]').click();
    cy.wait('@dataPasien').then(({response})=>{
      expect(response.statusCode).to.equal(200)
    })
    //back to home

    cy.visit('https://o2.openmrs.org/openmrs/index.htm');
    cy.get('[id="org-openmrs-module-coreapps-activeVisitsHomepageLink-org-openmrs-module-coreapps-activeVisitsHomepageLink-extension"]').contains('Active Visits').click();
    cy.wait(2000);

    cy.visit('https://o2.openmrs.org/openmrs/index.htm');
    cy.get('[id="referenceapplication-vitals-referenceapplication-vitals-extension"]').contains('Capture Vitals').click();
    cy.wait(2000);
    cy.get('[id="patient-search-form"]').click().type('test');
    cy.get('[id="patient-search-form"]').clear();
    cy.get('[class="odd"]').eq(0).click();
    cy.wait(100);

    cy.visit('https://o2.openmrs.org/openmrs/registrationapp/registerPatient.page?appId=referenceapplication.registrationapp.registerPatient')
    cy.wait(100)
    cy.get('[id="fr8748-field"]').click().type('Dhacha')
    cy.get('[id="fr4839-field"]').click().type('test');
    cy.get('[id="fr800-field"]').click().type('andika');
    cy.get('[id="next-button"]').click();
    cy.wait(100)
    cy.get('[id="gender-field"]').eq(1).contains('Female').click();
    cy.get('[id="birthdateDay-field"]').click().type('19');
    cy.get('[id="birthdateMonth"]').click();
    cy.get('.month date-component requiredTitle focused').eq(6).click();
    cy.get('[id="birthdateYear-field"]').click().type('1997');
    cy.get('[id="next-button"]').click();
    cy.wait(1000)
    cy.get('[id="address1"]').click().type('komp bambu kuning');
    cy.get('[id="cityVillage"]').click().type('maja');
    cy.get('[id="stateProvince"]').click().type('banten');
    cy.get('[id="country"]').click().type('indonesia');
    cy.get('[id="postalCode"]').click().type('12345');
    cy.get('[id="next-button"]').click();
    cy.wait(1000)
    cy.wait('[id="fr8020-field"]').click().type('089123456789');
    cy.get('[id="relationship_type"]').click().select('Doctor');
    cy.get('[id="next-button"]').click();
    cy.wait(1000)
    cy.get('[id="submit"]').contains('Confirm').click();
    cy.wait(2000);
    //bisa ditambahkan assert data

    cy.visit('https://o2.openmrs.org/openmrs/index.htm')
    cy.wait(1000)
    cy.get('[id="appointmentschedulingui-homeAppLink-appointmentschedulingui-homeAppLink-extension"]').click();


    cy.visit('https://o2.openmrs.org/openmrs/index.htm')
    cy.wait(1000)
    cy.get('[id="reportingui-reports-homepagelink-reportingui-reports-homepagelink-extension"]').click();


    cy.visit('https://o2.openmrs.org/openmrs/index.htm')
    cy.wait(1000)
    cy.get('[id="coreapps-datamanagement-homepageLink-coreapps-datamanagement-homepageLink-extension]').click();

    cy.visit('https://o2.openmrs.org/openmrs/index.htm')
    cy.wait(1000)
    cy.get('[id="org-openmrs-module-adminui-configuremetadata-homepageLink-org-openmrs-module-adminui-configuremetadata-homepageLink-extension"]').click();


    cy.visit('https://o2.openmrs.org/openmrs/index.htm')
    cy.wait(1000)
    cy.get('[id="coreapps-systemadministration-homepageLink-coreapps-systemadministration-homepageLink-extension"]').click();




  });
});
