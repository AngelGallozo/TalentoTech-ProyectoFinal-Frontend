// RutaProtegida.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RutaProtegida({ children }) {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    // Si user es null, todavía está cargando
    if (user === undefined) return null;

    if (!user) return <Navigate to="/login" />;

    // Si es ruta admin y user no es admin -> home
    if (location.pathname === "/admin" && user.type !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RutaProtegida;
