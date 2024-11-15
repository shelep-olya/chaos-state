import React from "react";
import { MemoryRouter } from "react-router-dom";

import Result from "./Result";

describe("Result Component", () => {
    const renderResultComponent = (results = null, isLoggedIn = false) => {
        cy.stubHook = cy.stub().returns({ results, isLoggedIn });
        cy.mount(
            <MemoryRouter>
                <Result />
            </MemoryRouter>
        );
    };

    it("renders loading message when results are loading", () => {
        renderResultComponent();

        cy.get('[data-testid="loading-message"]').should("exist").and("contain", "завантаження результатів...");
    });


    it("does not show signup link if user is logged in", () => {
        renderResultComponent("Test results content", null, true);

        cy.get('[data-testid="signup-link"]').should("not.exist");
    });
});
