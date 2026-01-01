function AvatarRive() {
  return (
    <div style={{ 
      width: '400px', 
      height: '400px',
      background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
      border: '2px solid rgba(96, 165, 250, 0.3)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Placeholder with coding icon */}
      <div style={{
        fontSize: '100px',
        color: 'rgba(96, 165, 250, 0.3)',
        animation: 'pulse 2s infinite'
      }}>
        💻
      </div>
      
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)',
        zIndex: '-1'
      }}></div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}