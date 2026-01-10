import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('master_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('master_token');
            if (!window.location.pathname.includes('/signin')) {
                window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);

// Allowed roles for this panel (Master = MASTER)
const ALLOWED_ROLES = ['MASTER'];

// Deployed URLs for redirection
const ROLE_URLS = {
    ADMIN: 'https://forexsuperadmin.vercel.app',
    SUPER_MASTER: 'https://forexadmin.vercel.app',
    MASTER: window.location.origin, // Master stays on this app
};

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('master_token'),
    isLoading: true,
    isAuthenticated: false,
};

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLoading: false,
                isAuthenticated: true,
            };
        case 'LOGIN_FAILURE':
            return { ...state, user: null, token: null, isLoading: false, isAuthenticated: false };
        case 'LOGOUT':
            return { ...state, user: null, token: null, isLoading: false, isAuthenticated: false };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext(undefined);

// Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check for token in URL (for cross-app login)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            localStorage.setItem('master_token', tokenFromUrl);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    // Initialize auth state on app load
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('master_token');

            if (token) {
                try {
                    const response = await api.get('/auth/profile');
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: { user: response.data.data.user, token },
                    });
                } catch (error) {
                    console.error('Failed to initialize auth:', error);
                    localStorage.removeItem('master_token');
                    dispatch({ type: 'LOGIN_FAILURE' });
                }
            } else {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            dispatch({ type: 'LOGIN_START' });

            const response = await api.post('/auth/login', {
                email: credentials.email,
                password: credentials.password,
            });
            const { user, accessToken } = response.data.data;

            // Check if the user's role matches this app
            if (!ALLOWED_ROLES.includes(user.role)) {
                // Redirect to the correct app with the token
                const targetUrl = ROLE_URLS[user.role];
                if (targetUrl && targetUrl !== window.location.origin) {
                    toast.info(`Redirecting to ${user.role} dashboard...`);
                    window.location.href = `${targetUrl}/signin?token=${accessToken}`;
                    return;
                }
                throw new Error('Access denied. You do not have permission to access this panel.');
            }

            localStorage.setItem('master_token', accessToken);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user, token: accessToken },
            });

            toast.success(`Welcome back, ${user.firstName || user.email}!`);
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });

            const errorMessage = error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Login failed';
            toast.error(errorMessage);

            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('master_token');
            dispatch({ type: 'LOGOUT' });
            toast.info('You have been logged out');
        }
    };

    const value = {
        ...state,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
