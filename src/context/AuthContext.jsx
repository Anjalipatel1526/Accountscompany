import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_USER = {
    id: "admin",
    role: "admin",
    name: "Admin",
    email: "Admin@unaitech.com",
    password: "UNAI@2026",
};

export function AuthProvider({ children, companies }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState("");

    const login = (email, password) => {
        setError("");

        // Admin check
        if (
            email.trim().toLowerCase() === ADMIN_USER.email.toLowerCase() &&
            password === ADMIN_USER.password
        ) {
            setCurrentUser({ id: "admin", role: "admin", name: "Admin", email: ADMIN_USER.email });
            return { success: true, role: "admin" };
        }

        // Company account check
        const match = companies.find(
            (c) =>
                c.loginId &&
                c.loginId.trim().toLowerCase() === email.trim().toLowerCase() &&
                c.password === password
        );

        if (match) {
            setCurrentUser({
                id: match.id,
                role: "company",
                companyRole: match.companyRole || "Company Owner", // Company Owner | Accountant
                name: match.name,
                email: match.loginId,
                companyId: match.id,
            });
            return { success: true, role: "company" };
        }

        setError("Invalid email or password. Please try again.");
        return { success: false };
    };

    const logout = () => setCurrentUser(null);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
