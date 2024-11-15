import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Me from './Me';


describe("Me Component", () => {
    beforeEach(() => {
        localStorage.setItem('username', 'TestUser');
        localStorage.setItem('token', 'mockToken'); 
    });

    const renderMeComponent = () => {
        cy.mount(
            <MemoryRouter>
                <Me />
            </MemoryRouter>
        );
    };

    it("should render the Me component with expected elements", () => {
        renderMeComponent(); 
        cy.get('[data-testid="account-container"]').should('exist');

        cy.get('[data-testid="username-text"]').should('contain', 'TestUser');

        cy.get('[data-testid="signout-button"]').should('exist').click();
      
        cy.get('[data-testid="delete-button"]').should('exist').click();
      
        cy.get('[data-testid="tests-row"]').should('exist');

        cy.get('[data-testid="pagination-controls"]').should('exist');
        cy.get('[data-testid="previous-button"]').should('exist'); 
        cy.get('[data-testid="next-button"]').should('exist'); 
    });
});
