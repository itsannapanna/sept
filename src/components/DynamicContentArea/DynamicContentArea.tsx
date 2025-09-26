import { ReactNode } from 'react';

interface DynamicContentAreaProps {
  children: ReactNode;
}

export default function DynamicContentArea({ children }: DynamicContentAreaProps) {
  return (
    <div
      style={{
        background: '#fffdfa',
        border: '1.5px solid #111',
        borderRadius: 8,
        padding: 16,
        margin: '20px auto 16px',
        boxShadow: '0 2px 0 rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.08)',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '900px', 
        width: '100%', 
      }}
    >
      {children}
    </div>
  );
}
