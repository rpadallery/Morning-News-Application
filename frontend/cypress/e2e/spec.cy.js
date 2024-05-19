describe('visit morning news', () => {
  it('visit', () => {
    cy.visit('http://localhost:3000/')
  })
  it('create a new user', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.fa-user').click()
    cy.get('#signUpUsername').type('obada')
    cy.get('#signUpPassword').type('obada')
    cy.get('#register').click()
    cy.wait(500)
    cy.get('.Header_logoutSection__KHqw2').contains("Welcome obada").should('exist')
  })
  it('logs the new user', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.fa-user').click()
    cy.get('#signInUsername').type('obada')
    cy.get('#signInPassword').type('obada')
    cy.get('#connection').click()
    cy.wait(500)
    cy.get('.Header_logoutSection__KHqw2').contains("Welcome obada").should('exist')
  })
})
