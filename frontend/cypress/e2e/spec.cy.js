describe("User Flow Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("allows a guest user to start the main page test without registering", () => {
        cy.get('[data-testid="test-button"]').click();
        cy.url().should("include", `/tests/66f586bec76785b1bfc0d33b`);
        cy.get('[data-testid="test-block"]').should("be.visible");
    });

    it("allows a new user to register", () => {
        cy.visit("http://localhost:3000/auth/register");
        cy.get('[data-testid="sign-up-name"]').type("Test User", { force: true });
        cy.get('[data-testid="sign-up-email"]').type("testuser@example.com", { force: true });
        cy.get('[data-testid="sign-up-password"]').type("password123", { force: true });
        cy.get('[data-testid="sign-up-password-confirm"]').type("password123", { force: true });
        cy.get('[data-testid="sign-up-submit"]').click({ force: true });
        cy.url().should("eq", "http://localhost:3000/auth/register");
    });

    it("allows an existing user to sign in and navigate to the home page", () => {
        cy.visit("http://localhost:3000/auth/register");
        cy.get('[data-testid="sign-in-email"]').type("shelep.olya@gmail.com");
        cy.get('[data-testid="sign-in-password"]').type("test1234");
        cy.get('[data-testid="sign-in-submit"]').click();
        cy.url().should("eq", "http://localhost:3000/");
    });

    it("should allow a logged-in user to create a test successfully and remain logged in", () => {
        cy.visit("http://localhost:3000/auth/register");
        cy.get('[data-testid="sign-in-email"]').type("shelep.olya@gmail.com");
        cy.get('[data-testid="sign-in-password"]').type("test1234");
        cy.get('[data-testid="sign-in-submit"]').click();
        cy.url().should("eq", "http://localhost:3000/");

        cy.visit("http://localhost:3000/create-test");

        cy.get('[data-testid="testNameInput"]').type("Sample Test");
        cy.get('[data-testid="descriptionInput"]').type("This is a sample test description.");
        cy.get('[data-testid="nextInfoBtn"]').click();

        cy.get('[data-testid="numQuestionsInput"]').type("3");
        cy.get('[data-testid="numResultsInput"]').type("2");
        cy.get('[data-testid="nextBtn"]').click();

        for (let i = 0; i < 3; i++) {
            cy.get(`[data-testid="questionInput-${i}"]`).type(`Sample Question ${i + 1}`);
            cy.get(`[data-testid="answer1Input-${i}"]`).type(`Answer 1 for Question ${i + 1}`);
            cy.get(`[data-testid="answer2Input-${i}"]`).type(`Answer 2 for Question ${i + 1}`);
            cy.get(`[data-testid="answer3Input-${i}"]`).type(`Answer 3 for Question ${i + 1}`);
            cy.get('[data-testid="nextQuestionBtn"]').click();
        }

        cy.get('[data-testid="resultInput-0"]').type("Result 1");
        cy.get('[data-testid="resultInput-1"]').type("Result 2");
        cy.get('[data-testid="finishBtn"]').click();

        cy.url().should("eq", "http://localhost:3000/me");
    });

    it("allows a logged-in user to log out successfully", () => {
        cy.visit("http://localhost:3000/auth/register");
        cy.get('[data-testid="sign-in-email"]').type("shelep.olya@gmail.com");
        cy.get('[data-testid="sign-in-password"]').type("test1234");
        cy.get('[data-testid="sign-in-submit"]').click();
        cy.url().should("eq", "http://localhost:3000/");

        cy.visit("http://localhost:3000/me");
        cy.get('[data-testid="signout-button"]').should("be.visible").click();
        cy.url().should("eq", "http://localhost:3000/auth/register");
    });
});
