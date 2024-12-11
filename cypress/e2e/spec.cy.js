describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5000')

    // navegamos a el apartado de registro
    cy.get('#registrar').click()

    // llenamos los campos
    cy.get('#event-type').select('Conferencia')
    cy.get('#event-title').type('Evento con Cypress')
    cy.get('#event-description').type('Se utilizó Cypress para crear este evento :D')
    cy.get('#event-location').type('NITE - ITM')
    cy.get('#event-date').type('{downArrow}')
    cy.get('#event-hour').type('06:00:00')
    cy.get('#participants').click()

    cy.get('#participant-name').type('Anabel')
    cy.get('#participant-lastname').type('Pineda')
    cy.get('#participant-email').type('correoAnabelReal@gmail.com')
    cy.get('#participant-phone').type('8681312597')
    cy.get('#role').select('Ponente')
    cy.get('#invitations').click()

    cy.get('#invitation-name').type('Oziel')
    cy.get('#invitation-email').type('ozzy_uwu@gmail.com')
    cy.get('#invitation-type').select('General')
    cy.get('#logistic').click()

    cy.get('#logistic-type').select('Alojamiento')
    cy.get('#logistic-provider').type('Infonavit')
    cy.get('#logistic-comments').type('Ese wey dormirá por ahí')
    cy.get('#confirmation').click()
  })
})
