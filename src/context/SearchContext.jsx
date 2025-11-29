// src/context/SearchContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [busqueda, setBusqueda] = useState("");
    const location = useLocation();

    // Cada vez que cambia la ruta, se borra la búsqueda
    useEffect(() => {
        setBusqueda("");
    }, [location.pathname]);

    return (
        <SearchContext.Provider value={{ busqueda, setBusqueda }}>
        {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
  return useContext(SearchContext);
}
