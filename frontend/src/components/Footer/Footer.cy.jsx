import React from "react";
import { MemoryRouter } from "react-router-dom";

import Footer from "./Footer";

describe("Footer Component", () => {
    beforeEach(() => {
        cy.mount(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );
    });

    it("should render the footer element", () => {
        cy.get('[data-testid="footer"]').should('exist');
    });

    it("should display the logo and copyright text", () => {
        cy.get('[data-testid="footer-logo"]').should('exist');
        cy.get('[data-testid="footer-logo"]').contains('chaos'); 

        cy.get('[data-testid="footer-rights"]').contains('all rights reserved | shelep olha');
    });

    it("should render and display Know More links with correct phone numbers", () => {
        cy.get('[data-testid="footer-know-more"]')
          .within(() => {
            cy.contains("0 800 505 201 - Гаряча лінія МОЗ");
            cy.contains("0 800 60 20 19 - Контакт-центр МОЗ");
            cy.contains("0 800 501 701 - Всеукраїнський телефон довіри");
        });
    });

    it("should render and display Get Help links with correct URLs", () => {
        cy.get('[data-testid="footer-get-help"]')
          .within(() => {
            cy.contains("Mindly Space").should("have.attr", "href", "https://mindlyspace.com/");
            cy.contains("Rozmova").should("have.attr", "href", "https://www.rozmova.me/");
            cy.contains("Tests").should("have.attr", "href", "https://www.rozmova.me/tests");
        });
    });
});
