"use client";

import { useEffect, useState } from 'react';

type ApiResponse = {
    message: string;
};

export default function Home() {
    const [message, setMessage] = useState<string>(''); // Zustand für die API-Daten
    const [loading, setLoading] = useState<boolean>(true); // Zustand für das Laden
    const [error, setError] = useState<string | null>(null); // Zustand für Fehler

    const fetchMessage = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:5000/api/hello'); // Backend-URL
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data: ApiResponse = await response.json(); // Typisiertes JSON
            setMessage(data.message); // API-Daten speichern
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false); // Laden abschließen
        }
    };

    useEffect(() => {
        fetchMessage();
    }, []);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1>Next.js + Backend API Example (TypeScript)</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                <p>Message from the backend: <strong>{message}</strong></p>
            )}
        </div>
    );
}
