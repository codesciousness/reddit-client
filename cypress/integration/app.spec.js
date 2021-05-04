describe('Reddit Science App', () => {
  it('has correct title', () => {
    cy.visit('https://reddit-science.netlify.app/');

    cy.title().should('include', 'Reddit Science');
  });
  it('activates and deactivates the category filter', () => {
    cy.contains('Animal Science').click();

    cy.get('.Filter__button__active').should('have.text', 'Animal Science');

    cy.contains('Anthropology').click();

    cy.get('.Filter__button__active').should('have.text', 'Anthropology');

    cy.contains('Anthropology').click();

    cy.get('.Filter__button__active').should('not.exist');
  });
  it('types into the searchbar and clears the search term', () => {
    cy.get('input')
      .type('diet')
      .should('have.value', 'diet');

    cy.get('.fa-times').click();

    cy.get('input').should('have.value', '');

    cy.get('input')
      .type('covid')
      .should('have.value', 'covid');

    cy.get('.fa-times').click();

    cy.get('input').should('have.value', '');
  });
  it('finds and selects a post to view the post detail page', () => {
    cy.get('.Post__trending').should('have.length', 5);

    cy.get('.Post__latest').should('have.length', 25);

    cy.get('.Post__trending__title:first').click();

    cy.url().should('include', 'posts');

    cy.get('.PostDetail');

    cy.get('.Post__latest');

    cy.get('.App__navbar__icon').click();

    cy.url().should('not.include', 'posts');

    cy.get('.Post__latest__title:first').click();

    cy.url().should('include', 'posts');

    cy.get('.PostDetail');

    cy.get('.Post__latest');
  });
  it('loads comments for the current post on the post detail page', () => {
    cy.get('.Comments__title').should('have.text', 'Comments');

    cy.get('.Comment');

    cy.get('.Comment__author');

    cy.get('.Comment__body');

    cy.get('.Comment__ups:first').contains('Ups');
  });
});