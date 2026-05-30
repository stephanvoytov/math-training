import { useState, useEffect, useRef } from 'react';
import './Timer.css';

interface Props {
  running: boolean;
  onTimeUp?: () => void;
}

export function Timer({ running, onTimeUp }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (running && startRef.current === null) {
      startRef.current = Date.now() - elapsed * 1000;
    }
    if (!running) {
      startRef.current = null;
    }
  }, [running, elapsed]);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      if (startRef.current !== null) {
        const sec = Math.floor((Date.now() - startRef.current) / 1000);
        setElapsed(sec);
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    if (elapsed >= 600 && onTimeUp) {
      onTimeUp();
    }
  }, [elapsed, running, onTimeUp]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const urgent = elapsed >= 540;

  return (
    <div className={`timer ${urgent ? 'timer-urgent' : ''}`} aria-label={`Прошло ${mins} минут ${secs} секунд`}>
      <span className="timer-icon" aria-hidden="true">⏱</span>
      <span className="timer-display">{display}</span>
    </div>
  );
}
