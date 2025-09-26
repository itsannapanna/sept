import type { Topic } from '../../types/quiz';

interface TopicPickerProps {
    topics: Topic[];
    onPick: (topic: Topic) => void;
    disabled?: boolean;
  }
  
export default function TopicPicker({ topics, onPick, disabled }: TopicPickerProps) {
  function getBorderPattern(topic: Topic) {
    switch (topic) {
      case 'Tech Trends':
        return 'repeating-linear-gradient(90deg, #111 0 10px, transparent 10px 18px)';
      case 'Wellness':
        return 'repeating-linear-gradient(90deg, #111 0 12px, transparent 12px 20px)';
        case 'Beauty Buzz':
          return 'repeating-linear-gradient(90deg, #111 0 14px, transparent 14px 22px)';
      case 'AI':
      default:
        return 'repeating-linear-gradient(90deg, #111 0 8px, transparent 8px 16px)';
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12, width: '100%' }}>
      {topics.map((t) => {
        const borderPattern = getBorderPattern(t);
        return (
          <button
            key={t}
            onClick={() => onPick(t)}
            disabled={disabled}
            style={{
              padding: '10px 12px',
              borderRadius: 6,
              border: '1.5px solid #111',
              background: disabled ? '#e5e7eb' : '#fffdfa',
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              color: '#111827',
              boxShadow: '0 1px 0 rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.06)',
              transition: 'transform 140ms ease, box-shadow 140ms ease',
              transform: 'translateZ(0)',
              fontFamily: 'Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
              fontWeight: 600,
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 2px 0 rgba(0,0,0,0.4), 0 12px 24px rgba(0,0,0,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.06)';
              }
            }}
            onMouseDown={(e) => {
              if (!disabled) e.currentTarget.style.transform = 'translateY(0) scale(0.995)';
            }}
            onMouseUp={(e) => {
              if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 18,
                height: 18,
                background: '#111',
                maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 63%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 63%)',
                display: 'inline-block'
              }} />
              <span>{t}</span>
            </div>
            <div style={{ height: 10 }} />
            <div style={{ height: 1, backgroundImage: borderPattern, backgroundSize: '24px 1px' }} />
          </button>
        );
      })}
    </div>
  );
}