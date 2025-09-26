export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div
        style={{
          width: 28,
          height: 28,
          border: '3px solid #e5e7eb',
          borderTopColor: '#3b82f6',
          borderRadius: '9999px',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}


