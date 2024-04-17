describe('Модуль поиска города', () => {
  it('Поиск через submit', () => {
    cy.visit('http://localhost:4200')

    cy.get('.city-form__input').clear().type('Minsk');
    cy.get('.city-form__button').click();
    cy.get('.city-form__input').should('have.value', 'Minsk, Belarus');

  })
  it('Поиск через варианты', () => {
    cy.visit('http://localhost:4200')

    cy.get('.city-form__input').clear().type('Ber');
    cy.contains('Berlin').click();
    cy.get('.city-form__input').should('have.value', 'Berlin, Germany');
  })
})
