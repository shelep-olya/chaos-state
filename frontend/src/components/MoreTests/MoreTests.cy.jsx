import React from "react";
import { MemoryRouter } from "react-router-dom";

import MoreTests from "./MoreTests";

describe("MoreTests Component", () => {
    const renderMoreTestsComponent = () => {
        cy.mount(
            <MemoryRouter>
                <MoreTests />
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        renderMoreTestsComponent();
    });

    it("should display loading message when data is not loading", () => {
        renderMoreTestsComponent({ loading: false });
        cy.get("div").should("contain", "Loading...");
    });

    it("should NOT display test names and descriptions when there are no tests", () => {
        cy.get("h3").should("not.exist");
        cy.get("p").should("not.exist");
    });


});
