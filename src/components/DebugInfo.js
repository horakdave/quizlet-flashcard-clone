import React, { useState } from 'react';

export default function DebugInfo() {
  const [isVisible, setIsVisible] = useState(false);

  const getStorageInfo = () => {
    try {
      const data = localStorage.getItem('quizlet-app-state');
      if (data) {
        const parsed = JSON.parse(data);
        return {
          topicsCount: Object.keys(parsed.topics?.topics || {}).length,
          quizzesCount: Object.keys(parsed.quizzes?.quizzes || {}).length,
          cardsCount: Object.keys(parsed.cards?.cards || {}).length,
          rawData: parsed
        };
      }
      return { topicsCount: 0, quizzesCount: 0, cardsCount: 0, rawData: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const storageInfo = getStorageInfo();

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      zIndex: 1000
    }}>
      <button 
        onClick={() => setIsVisible(!isVisible)}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}
      >
         Debug
      </button>
      
      {isVisible && (
        <div style={{
          background: 'rgba(240, 240, 240, 0.95)',
          padding: '15px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          fontSize: '12px',
          backdropFilter: 'blur(10px)',
          minWidth: '200px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Debug Info:</h4>
          {storageInfo.error ? (
            <p style={{ color: 'red' }}>Error: {storageInfo.error}</p>
          ) : (
            <>
              <p style={{ margin: '5px 0', color: '#666' }}>Topics: {storageInfo.topicsCount}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>Quizzes: {storageInfo.quizzesCount}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>Cards: {storageInfo.cardsCount}</p>
              <button 
                onClick={() => {
                  console.log('Current localStorage data:', storageInfo.rawData);
                  alert('Check console for localStorage data');
                }}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  marginTop: '10px',
                  width: '100%'
                }}
              >
                Log to Console
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
