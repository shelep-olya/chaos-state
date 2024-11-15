import React from "react";
import { MemoryRouter } from "react-router-dom";

import Main from "./Main";

describe("Main Component", () => {
    beforeEach(() => {
        cy.mount(
            <MemoryRouter>
                <Main />
            </MemoryRouter>
        );
    });

    it("should render the main container", () => {
        cy.get('[data-testid="main-container"]').should('exist');
    });

    it("should display the main image", () => {
        cy.get('[data-testid="main-image"]').should('exist');
        cy.get('[data-testid="main-image"]').should('have.attr', 'alt', 'chaos-main-image');
    });

    it("should show the logged-out title", () => {
        cy.get('[data-testid="main-title-logged-out"]').should('exist').contains('Здавалося б все — можна вішатись, але');
    });

    it("should show the test button when logged out", () => {
        cy.get('[data-testid="test-button"]').should('exist').contains('тест');
    });

    it("should show the welcome message when logged in", () => {
        localStorage.setItem("token", "mockToken");
        localStorage.setItem("username", "TestUser");

        cy.mount(
            <MemoryRouter>
                <Main />
            </MemoryRouter>
        );

        cy.get('[data-testid="main-title"]').should('exist').contains('Вітаємо, TestUser');
        cy.get('[data-testid="create-test-button"]').should('exist').contains('почати');
    });


});
