import Ingredients from '../fixtures/ingredients.json';

describe('Constructor', () => {
  beforeEach(function() {
    cy.intercept(
        'https://norma.nomoreparties.space/api/ingredients',
        {
          fixture: 'ingredients.json',
        }
    ).as('getIngredients');

    cy.intercept(
        'https://norma.nomoreparties.space/api/auth/user',
        {
          body: {"success":true,"user":{"email":"dm.haiduchonak+rr2@gmail.com","name":"Дмитрий2222"}}
        }
    )
    cy.intercept(
        'POST',
        'https://norma.nomoreparties.space/api/orders',
        {
          fixture: 'order-detail.json',
        }
    )

    cy.visit('http://localhost:3000');
  });

  it('ingredient modal show', () => {
    cy.get('[data-testid="ingredient-item-60d3b41abdacab0026a733cd"]').should('be.visible');
    cy.url().should('include', '/');
    cy.get('[data-testid="ingredient-item-60d3b41abdacab0026a733cd"]').click();
    cy.get('[data-testid="modal"').should('be.visible');
    cy.url().should('include', 'ingredients/60d3b41abdacab0026a733cd');
    cy.get('[data-testid="ingredient-info-image"').should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/sauce-04-large.png');
    cy.get('[data-testid="ingredient-info-name"').should('contain.text', 'Соус фирменный Space Sauce');
    cy.get('[data-testid="ingredient-info-calories"').should('contain.text', '14');
    cy.get('[data-testid="ingredient-info-proteins"').should('contain.text', '50');
    cy.get('[data-testid="ingredient-info-fat"').should('contain.text', '22');
    cy.get('[data-testid="ingredient-info-carbohydrates"').should('contain.text', '11');

    cy.get('[data-testid="modal-close"]').click();
    cy.url().should('include', '/');
  })

  it('ingredient drag`n`drop', () => {

    cy.get('[data-testid="ingredient-item-60d3b41abdacab0026a733c6"]').should('be.visible');

    cy.get('[data-testid="ingredient-item-60d3b41abdacab0026a733cd"]').should('be.visible');
    cy.get('[data-testid="order-submit"] button').should('be.disabled');

    cy.get('[data-testid="ingredient-item-60d3b41abdacab0026a733cd"]').trigger("dragstart");
    cy.get('[data-testid="constructor"]')
        .trigger("drop")
        .trigger("dragend");

    cy.get('[data-testid="ingredient-item-60d3b41abdacab0026a733c6"]').trigger("dragstart");
    cy.get('[data-testid="constructor"]')
        .trigger("drop")
        .trigger("dragend");

    cy.get('[data-testid="order-sum"]').should('contain.text', '2590');
    cy.get('[data-testid="order-submit"] > button').should('be.enabled').should('contain.text', 'Оформить заказ');
    cy.get('[data-testid="order-submit"] > button').click('center');
    cy.get('[data-testid="order-detail-number"').should('contain.text', '12559');

    cy.get('[data-testid="modal-close"]').click();
    cy.url().should('include', '/');
  })
})
