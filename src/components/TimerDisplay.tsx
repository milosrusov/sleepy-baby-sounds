
import { useEffect, useState } from 'react';

interface TimerDisplayProps {
  remainingMilliseconds: number | null;
}

const TimerDisplay = ({ remainingMilliseconds }: TimerDisplayProps) => {
  const [formattedTime, setFormattedTime] = useState<string>('∞');
  
  useEffect(() => {
    if (!remainingMilliseconds) {
      setFormattedTime('∞');
      return;
    }
    
    const minutes = Math.floor(remainingMilliseconds / (60 * 1000));
    const seconds = Math.floor((remainingMilliseconds % (60 * 1000)) / 1000);
    
    setFormattedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  }, [remainingMilliseconds]);
  
  if (!remainingMilliseconds) return null;
  
  return (
    <div className="text-center mt-4">
      <span className="text-xl font-semibold text-baby-700">{formattedTime}</span>
    </div>
  );
};

export default TimerDisplay;
