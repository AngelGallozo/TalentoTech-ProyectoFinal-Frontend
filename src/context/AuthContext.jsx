import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
const API_URL = import.meta.env.VITE_BACKEND_URL;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const id = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        const type = localStorage.getItem("isAdmin") === "true" ? "admin" : "user";

        if (id && username) {
            setUser({ id, username, type });
        } else {
            setUser(null);
        }
    }, []);



    const login = async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: username, password }),
            });

            if (!response.ok) throw new Error("Credenciales incorrectas");

            const data = await response.json();

            // Guardar bien los nombres correctos
            localStorage.setItem("userId", data.id);
            localStorage.setItem("username", data.user);
            localStorage.setItem("isAdmin", data.type === "admin");

            setUser({
                id: data.id,
                username: data.user,
                type: data.type,
            });

            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
