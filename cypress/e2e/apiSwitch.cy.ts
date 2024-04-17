describe('Модуль переключения API', () => {
  it('Переключение', () => {
    cy.visit('http://localhost:4200')

    cy.get('.daily-button').click();
    cy.get('.weather-daily').should('exist');
    cy.get('.hourly-button').click();
    cy.get('.weather-hourly').should('exist');
  })
})
