describe('Модуль получения событий', () => {
  it('Получение событий', () => {
    cy.visit('http://localhost:4200');
    cy.get('.auth__button').click();
  })
})
