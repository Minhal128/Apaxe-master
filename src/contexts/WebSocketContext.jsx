import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [prices, setPrices] = useState({});
    const socketRef = useRef(null);
    const subscriptions = useRef(new Set());
    const reconnectTimeoutRef = useRef(null);
    const isConnectingRef = useRef(false);

    const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5001';

    const connect = () => {
        const token = localStorage.getItem('master_token');
        if (!token || isConnectingRef.current) return;

        // Clear any pending reconnection attempts
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        // Close existing connection if any
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }

        isConnectingRef.current = true;
        const socket = new WebSocket(`${WS_URL}?token=${token}`);

        socket.onopen = () => {
            console.log('WebSocket Connected');
            setIsConnected(true);
            isConnectingRef.current = false;

            // Re-subscribe to existing instruments on reconnect
            if (subscriptions.current.size > 0) {
                socket.send(JSON.stringify({
                    type: 'subscribe',
                    instruments: Array.from(subscriptions.current)
                }));
            }
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'price') {
                    setPrices(prev => ({
                        ...prev,
                        [message.data.instrumentId]: message.data
                    }));
                }
            } catch (error) {
                console.error('WebSocket message parse error:', error);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket Disconnected');
            setIsConnected(false);
            isConnectingRef.current = false;
            socketRef.current = null;

            // Attempt to reconnect after 5 seconds if not manually closed
            reconnectTimeoutRef.current = setTimeout(() => {
                connect();
            }, 5000);
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
            isConnectingRef.current = false;
        };

        socketRef.current = socket;
    };

    const subscribe = (instruments) => {
        const instrumentList = Array.isArray(instruments) ? instruments : [instruments];
        instrumentList.forEach(id => subscriptions.current.add(id));

        if (isConnected && socketRef.current) {
            socketRef.current.send(JSON.stringify({
                type: 'subscribe',
                instruments: instrumentList
            }));
        }
    };

    const unsubscribe = (instruments) => {
        const instrumentList = Array.isArray(instruments) ? instruments : [instruments];
        instrumentList.forEach(id => subscriptions.current.delete(id));

        if (isConnected && socketRef.current) {
            socketRef.current.send(JSON.stringify({
                type: 'unsubscribe',
                instruments: instrumentList
            }));
        }
    };

    useEffect(() => {
        connect();
        return () => {
            // Clear reconnection timeout
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
            // Close socket connection
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
            isConnectingRef.current = false;
        };
    }, []);

    const value = {
        isConnected,
        prices,
        subscribe,
        unsubscribe
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};
