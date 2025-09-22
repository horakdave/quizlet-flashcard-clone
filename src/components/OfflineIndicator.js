import React, { useState, useEffect } from 'react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        background: '#ffc107',
        color: '#000',
        padding: '10px',
        textAlign: 'center',
        zIndex: 1000,
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}>
        📱 You're offline - Your flashcards are still available!
      </div>
    );
  }

  return null;
}
