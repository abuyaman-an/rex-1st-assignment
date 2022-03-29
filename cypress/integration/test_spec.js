/// <reference types="cypress" />

describe('example to-do app', () => {

    it("Visit the homepage", () => {
        cy.visit("http://localhost:3000/");
        cy.get(".navbar__links a[href='/']").should("have.class", "active")
    })

    it("Find two lists of recipes", () => {
        cy.get(".recipes-list__list").should("have.length", 2);
    })

    it("Recipes lists must have recipes/results", () => {
        cy.get(".recipes-list__list").each(($el) => {
            $el.get(".single-recipe-container").should("have.length.gte", 1);
        })
    })

    it("Search functionality", () => {

        // user enters a searh term
        cy.get(".search-bar__input").type("steak{enter}")

    })


    // user hits enter in the search input

    // user get loading indicator for start searching

    // user gets the search results back
})