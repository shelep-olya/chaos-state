import { useState } from "react";

import { fetchUsername,signIn, signUp } from "../services/authService"; 

const useAuth = () => {
    const [username, setUsername] = useState("");

    const handleSignIn = async (email, password) => {
        try {
            const result = await signIn(email, password);
            if (result.token) {
                localStorage.setItem("token", result.token);
                const profileResult = await fetchUsername(email);
                if (profileResult.data && profileResult.data.user) {
                    setUsername(profileResult.data.user.name);
                    localStorage.setItem("username", profileResult.data.user.name);
                    return { success: true };
                } else {
                    console.error(profileResult.message);
                    return { success: false, error: profileResult.message };
                }
            } else {
                console.error(result.message);
                return { success: false, error: result.message };
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            return { success: false, error: error.message };
        }
    };

    const handleSignUp = async (name, email, password, passwordConfirm) => {
        try {
            const result = await signUp(name, email, password, passwordConfirm);
            if (result.token) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("username", name);
                setUsername(name);
                return { success: true };
            } else {
                console.error(result.message);
                return { success: false, error: result.message };
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            return { success: false, error: error.message };
        }
    };

    return { username, handleSignIn, handleSignUp };
};

export default useAuth;
