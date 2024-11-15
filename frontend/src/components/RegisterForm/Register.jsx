import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as Components from "./Register.js";

function Register() {
    const [signIn, toggle] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();
    const { handleSignIn, handleSignUp } = useAuth();

    const handleSignInClick = async (e) => {
        e.preventDefault();
        const result = await handleSignIn(email, password);
        if (result.success) {
            navigate("/");
            window.location.reload();
        } else {
            console.error(result.error);
        }
    };

    const handleSignUpClick = async (e) => {
        e.preventDefault();
        const result = await handleSignUp(name, email, password, passwordConfirm);
        if (result.success) {
            navigate("/");
            window.location.reload();
        } else {
            console.error(result.error);
        }
    };

    return (
        <div data-testid="register-component">
            <Components.Container>
                <Components.SignUpContainer $signin={signIn} data-testid="sign-up-container">
                    <Components.Form onSubmit={handleSignUpClick} data-testid="sign-up-form">
                        <Components.Title>зареєструватись</Components.Title>
                        <Components.Input
                            type="text"
                            placeholder="ім'я..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            data-testid="sign-up-name"
                        />
                        <Components.Input
                            type="email"
                            placeholder="пошта..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            data-testid="sign-up-email"
                        />
                        <Components.Input
                            type="password"
                            placeholder="пароль..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            data-testid="sign-up-password"
                        />
                        <Components.Input
                            type="password"
                            placeholder="підтвердження паролю..."
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            data-testid="sign-up-password-confirm"
                        />
                        <Components.Button type="submit" data-testid="sign-up-submit">зареєструватись</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer $signin={signIn} data-testid="sign-in-container">
                    <Components.Form onSubmit={handleSignInClick} data-testid="sign-in-form">
                        <Components.Title>увійти</Components.Title>
                        <Components.Input
                            type="email"
                            placeholder="пошта..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            data-testid="sign-in-email"
                        />
                        <Components.Input
                            type="password"
                            placeholder="пароль..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            data-testid="sign-in-password"
                        />
                        <Components.Button type="submit" data-testid="sign-in-submit">увійти</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer $signin={signIn} data-testid="overlay-container">
                    <Components.Overlay $signin={signIn}>
                        <Components.LeftOverlayPanel $signin={signIn} data-testid="left-overlay-panel">
                            <Components.Title>ласкаво просимо!</Components.Title>
                            <Components.Paragraph>
                                щоб залишатися на зв'язку з нами, увійдіть, використовуючи свої особисті дані
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)} data-testid="switch-to-sign-in">увійти</Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel $signin={signIn} data-testid="right-overlay-panel">
                            <Components.Title>привіт, друже!</Components.Title>
                            <Components.Paragraph>
                                введіть свої особисті дані та розпочніть свою подорож з нами
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)} data-testid="switch-to-sign-up">зареєструватись</Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
}

export default Register;
