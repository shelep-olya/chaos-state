import React from "react";
import * as reactRouterDom from "react-router-dom"; 

import CreateTest from "./CreateTest";

describe("Create Test", () => {
    beforeEach(() => {
        cy.stub(reactRouterDom, "useNavigate").returns(() => {});
        cy.mount(
            <reactRouterDom.BrowserRouter>
                <CreateTest />
            </reactRouterDom.BrowserRouter>
        );
    });

    it("should render the create test form", () => {
        cy.get('[data-testid="createTestForm"]').should("exist");
    });

    it("should display and allow step navigation", () => {
        cy.get('[data-testid="testNameInput"]').type("Sample Test Name");
        cy.get('[data-testid="descriptionInput"]').type("Sample description for the test.");
        cy.get('[data-testid="nextInfoBtn"]').click();
        

        cy.get('[data-testid="numQuestionsInput"]').should("be.visible").type("2");
        cy.get('[data-testid="numResultsInput"]').should("be.visible").type("2");

        cy.get('[data-testid="nextBtn"]').click();
    });

    it("should navigate back to the previous step from step 2", () => {
        cy.get('[data-testid="testNameInput"]').type("Sample Test Name");
        cy.get('[data-testid="descriptionInput"]').type("Sample description for the test.");
        cy.get('[data-testid="nextInfoBtn"]').click();
        

        cy.get('[data-testid="prevBtn"]').click();
        

        cy.get('[data-testid="testNameInput"]').should("be.visible");
        cy.get('[data-testid="descriptionInput"]').should("be.visible");
    });

    it("should handle question navigation", () => {
        cy.get('[data-testid="testNameInput"]').type("Sample Test Name");
        cy.get('[data-testid="descriptionInput"]').type("Sample description.");
        cy.get('[data-testid="nextInfoBtn"]').click();
        
        cy.get('[data-testid="numQuestionsInput"]').type("2");
        cy.get('[data-testid="numResultsInput"]').type("2");
        cy.get('[data-testid="nextBtn"]').click();

        cy.get('[data-testid="questionInput-0"]').type("Sample Question 1");
        cy.get('[data-testid="answer1Input-0"]').type("Answer 1");
        cy.get('[data-testid="answer2Input-0"]').type("Answer 2");
        cy.get('[data-testid="answer3Input-0"]').type("Answer 3");

        cy.get('[data-testid="nextQuestionBtn"]').click();
        cy.get('[data-testid="questionInput-1"]').should("exist").type("Sample Question 2");
    });

    it("should display the results input fields and allow submission", () => {
        cy.get('[data-testid="testNameInput"]').type("Sample Test Name");
        cy.get('[data-testid="descriptionInput"]').type("Sample description.");
        cy.get('[data-testid="nextInfoBtn"]').click();

        cy.get('[data-testid="numQuestionsInput"]').type("2");
        cy.get('[data-testid="numResultsInput"]').type("2");
        cy.get('[data-testid="nextBtn"]').click();
 
        cy.get('[data-testid="questionInput-0"]').type("Sample Question 1");
        cy.get('[data-testid="answer1Input-0"]').type("Answer 1");
        cy.get('[data-testid="answer2Input-0"]').type("Answer 2");
        cy.get('[data-testid="answer3Input-0"]').type("Answer 3");
        cy.get('[data-testid="nextQuestionBtn"]').click();

        cy.get('[data-testid="questionInput-1"]').type("Sample Question 2");
        cy.get('[data-testid="answer1Input-1"]').type("Answer 1");
        cy.get('[data-testid="answer2Input-1"]').type("Answer 2");
        cy.get('[data-testid="answer3Input-1"]').type("Answer 3");
        cy.get('[data-testid="nextQuestionBtn"]').click();


        cy.get('[data-testid="resultInput-0"]').should("be.visible").type("Result 1");
        cy.get('[data-testid="resultInput-1"]').type("Result 2");


        cy.get('[data-testid="finishBtn"]').click();

    });
});
