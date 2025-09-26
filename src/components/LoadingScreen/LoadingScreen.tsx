import { LoadingSpinner } from '../LoadingSpinner';

export default function LoadingScreen() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center',
      height: '100%'
    }}>
      <div style={{
        fontFamily: "'Cinzel', ui-serif, Georgia, serif",
        fontSize: '20px',
        fontWeight: '700',
        letterSpacing: '0.1em',
        color: '#111',
        marginBottom: '16px'
      }}>
        PREPARING TODAY'S QUIZ
      </div>
      <div style={{
        height: '2px',
        background: 'repeating-linear-gradient(90deg, #111, #111 12px, transparent 12px, transparent 18px)',
        margin: '16px 0',
        width: '200px'
      }} />
      <LoadingSpinner />
      <p style={{ 
        marginTop: '20px', 
        color: '#374151',
        fontFamily: "'Lora', ui-serif, Georgia, serif",
        fontSize: '16px',
        fontWeight: '600'
      }}>
        Hot off the press...
      </p>
      
      <div style={{
        marginTop: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: '#f3f4f6',
        padding: '8px 16px',
        borderRadius: '4px',
        fontFamily: "'Lora', ui-serif, Georgia, serif",
        fontSize: '12px',
        letterSpacing: '0.05em',
        animation: 'ticker 2s ease-in-out infinite alternate'
      }}>
        Edition 1243 | Thursday, Sept 25, 2025
      </div>
    </div>
  );
}
