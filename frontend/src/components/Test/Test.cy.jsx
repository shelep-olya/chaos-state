import React from "react";
import { MemoryRouter } from "react-router-dom";

import Test from "./Test";

describe("Test Component", () => {

    const renderTestComponent = () => {

        cy.mount(
            <MemoryRouter>
                <Test />
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        renderTestComponent();
    });

    it("should display loading message when test data is unavailable", () => {
        cy.get('[data-testid="loading-message"]').should("exist").and("contain", "Loading...");
    });

    it("should display the current question and its answers", () => {
        cy.get('[data-testid="question-title"]').should("not.exist");
    });
 
});
