interface ProgressBarProps {
  current: number; // 1-based index for display
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.max(0, Math.round((current / total) * 100))) : 0;

  return (
    <div
      aria-label="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      style={{
        width: '100%',
        margin: '16px 0',
        position: 'relative',
        height: '2px',
        backgroundImage: 'repeating-linear-gradient(to right, black 0 4px, transparent 4px 8px)',
        backgroundRepeat: 'repeat-x',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '2px',
          backgroundColor: 'black',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
