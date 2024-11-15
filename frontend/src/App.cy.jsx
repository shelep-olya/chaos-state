import './App.module.css'; 

import { mount } from 'cypress/react';
import React from 'react';

import App from './App'; 


describe('App Component', () => {
    it('renders the title correctly', () => {
        mount(<App />);

        cy.get('h1').should('have.text', 'title');

        cy.get('div').should('have.class', 'appContainer');
    });
});
