import { memo } from 'react';
import './ProgressBar.css';

interface Props {
  current: number;
  total: number;
}

export const ProgressBar = memo(function ProgressBar({ current, total }: Props) {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={`${current} из ${total}`}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">{current}/{total}</span>
    </div>
  );
});
