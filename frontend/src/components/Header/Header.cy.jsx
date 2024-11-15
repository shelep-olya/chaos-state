import React from "react";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";

describe("Header Component", () => {
    beforeEach(() => {
        cy.mount(
            <MemoryRouter>
                <Header isLoggedIn={false} />
            </MemoryRouter>
        );
    });

    it("should render the header element", () => {
        cy.get('[data-testid="header"]').should('exist');
    });

    it("should display the logo", () => {
        cy.get('[data-testid="header-logo"]').should('exist');
        cy.get('[data-testid="header-logo"]').contains('chaos'); 
    });

    it("should show login link when user is not logged in", () => {
        cy.get('[data-testid="header-links"]').within(() => {
            cy.get('[data-testid="login-link"]').should('exist').contains('увійти');
            cy.get('[data-testid="test-link"]').should('exist');
            cy.get('[data-testid="create-test-link"]').should('not.exist'); 
        });
    });

    it("should show navigation links when user is logged in", () => {
        cy.mount(
            <MemoryRouter>
                <Header isLoggedIn={true} />
            </MemoryRouter>
        );

        cy.get('[data-testid="header-links"]').within(() => {
            cy.get('[data-testid="create-test-link"]').should('exist').contains('створити тест');
            cy.get('[data-testid="more-tests-link"]').should('exist').contains('більше тестів');
            cy.get('[data-testid="my-page-link"]').should('exist').contains('моя сторінка');
            cy.get('[data-testid="login-link"]').should('not.exist'); 
        });
    });
});
