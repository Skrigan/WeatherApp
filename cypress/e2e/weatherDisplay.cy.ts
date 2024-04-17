describe('Модуль отображения погоды', () => {
  it('Отображение', () => {
    cy.visit('http://localhost:4200')

    cy.get('.daily-button').click();
    cy.get('.weather-daily').find('.weather-item').should('have.length', 5);
    cy.get('.hourly-button').click();
    cy.get('.weather-hourly').find('.weather-item').should('have.length', 40);
  })
})
