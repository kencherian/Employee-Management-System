import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

const userContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // No need to manually attach a token header; the cookie handles it implicitly
                const response = await axios.get(`${API_BASE_URL}/auth/verify`);
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = async () => {
        try {
            // Call the backend to clear the secure cookie
            await axios.post(`${API_BASE_URL}/auth/logout`);
        } catch (error) {
            console.error("Logout failed:", error);
        }
        setUser(null);
        // REMOVED: localStorage.removeItem("token");
    };

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => useContext(userContext);
export default AuthContext;