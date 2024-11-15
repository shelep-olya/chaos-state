import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(135, 199, 255, 0.8);
    overflow: hidden;
    width: 678px;
    max-width: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
`;

export const SignUpContainer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
    ${(props) =>
        props.$signin !== true
            ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 `
            : null}
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SignInContainer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    z-index: 2;
    ${(props) => (props.$signin !== true ? `transform: translateX(100%);` : null)}
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Form = styled.form`
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
`;

export const Title = styled.h1`
    font-weight: bold;
    margin: 0;
`;

export const Input = styled.input`
    font-weight: bold;
    border: 1px solid #87c7ff;
    border-radius: 12px;
    padding: 12px 20px;
    margin: 20px 10px 10px;
    width: 100%;
    &::placeholder {
        color: black;
        font-weight: lighter;
        font-size: 14px;
        letter-spacing: 1px;
    }
`;

export const Button = styled.button`
    margin-top: 10px;
    border-radius: 12px;
    border: 1px solid var(--border-blue);
    background-color: var(--main-blue);
    color: black;
    font-size: 14px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    transition: transform 80ms ease-in;
    cursor: pointer;
    &:active {
        transform: scale(0.95);
    }
    &:hover {
        box-shadow: 0 0 10px rgba(135, 199, 255, 0.8);
    }
    &:focus {
        outline: none;
    }
`;

export const GhostButton = styled(Button)`
    background-color: transparent;
    border-color: white;
`;

export const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    ${(props) => (props.$signin !== true ? `transform: translateX(-100%);` : null)}
`;

export const Overlay = styled.div`
    display: flex;
    background: var(--main-blue);
    background: -webkit-linear-gradient(to right, var(--border-blue), var(--main-blue));
    background: linear-gradient(to right, var(--border-blue), var(--main-blue));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    ${(props) => (props.$signin !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
    transform: translateX(-20%);
    ${(props) => (props.$signin !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${(props) => (props.$signin !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
`;
