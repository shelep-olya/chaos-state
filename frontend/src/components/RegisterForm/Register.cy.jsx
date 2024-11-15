import React from "react";
import { MemoryRouter } from "react-router-dom";

import Register from "./Register.jsx";

describe("Register Component", () => {
    beforeEach(() => {
        cy.mount(
            <MemoryRouter>
                <Register signIn={true} />
            </MemoryRouter>
        );
    });
    

    it("should render the Register component", () => {
        cy.get('[data-testid="register-component"]').should("exist");
    });

    it("should display the sign-up form with required fields", () => {
        cy.get('[data-testid="sign-up-container"]').should("exist");
        cy.get('[data-testid="sign-up-name"]').should("exist").and("have.attr", "placeholder", "ім'я...");
        cy.get('[data-testid="sign-up-email"]').should("exist").and("have.attr", "placeholder", "пошта...");
        cy.get('[data-testid="sign-up-password"]').should("exist").and("have.attr", "placeholder", "пароль...");
        cy.get('[data-testid="sign-up-password-confirm"]').should("exist").and("have.attr", "placeholder", "підтвердження паролю...");
    });

    it("should display the sign-in form with required fields", () => {
        cy.get('[data-testid="sign-in-container"]').should("exist");
        cy.get('[data-testid="sign-in-email"]').should("exist").and("have.attr", "placeholder", "пошта...");
        cy.get('[data-testid="sign-in-password"]').should("exist").and("have.attr", "placeholder", "пароль...");
    });


    it("should have appropriate buttons and texts for UI flow", () => {
        cy.get('[data-testid="sign-up-submit"]').should("exist").and("contain.text", "зареєструватись");
        cy.get('[data-testid="sign-in-submit"]').should("exist").and("contain.text", "увійти");
        cy.get('[data-testid="switch-to-sign-in"]').should("exist").and("contain.text", "увійти");
        cy.get('[data-testid="switch-to-sign-up"]').should("exist").and("contain.text", "зареєструватись");
    });

    it("should display correct placeholder text for input fields", () => {
        cy.get('[data-testid="sign-up-name"]').should("have.attr", "placeholder", "ім'я...");
        cy.get('[data-testid="sign-up-email"]').should("have.attr", "placeholder", "пошта...");
        cy.get('[data-testid="sign-up-password"]').should("have.attr", "placeholder", "пароль...");
        cy.get('[data-testid="sign-up-password-confirm"]').should("have.attr", "placeholder", "підтвердження паролю...");
        cy.get('[data-testid="sign-in-email"]').should("have.attr", "placeholder", "пошта...");
        cy.get('[data-testid="sign-in-password"]').should("have.attr", "placeholder", "пароль...");
    });
});
