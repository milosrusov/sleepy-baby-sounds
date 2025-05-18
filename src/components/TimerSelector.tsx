
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TimerSelectorProps {
  onSelectTimer: (minutes: number | null) => void;
  selectedTimer: number | null;
}

const TimerSelector = ({ onSelectTimer, selectedTimer }: TimerSelectorProps) => {
  const timerOptions = [15, 30, 60, 120];

  return (
    <div className="flex flex-col space-y-3 w-full">
      <h3 className="text-lg font-medium mb-2">Sleep Timer</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedTimer === null ? "default" : "outline"} 
          onClick={() => onSelectTimer(null)}
          className="bg-baby-100 hover:bg-baby-200 text-gray-700 border-baby-200"
        >
          ∞ Continuous
        </Button>
        
        {timerOptions.map(time => (
          <Button 
            key={time}
            variant={selectedTimer === time ? "default" : "outline"} 
            onClick={() => onSelectTimer(time)}
            className={
              selectedTimer === time 
                ? "bg-baby-500 hover:bg-baby-600" 
                : "bg-baby-100 hover:bg-baby-200 text-gray-700 border-baby-200"
            }
          >
            {time} min
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimerSelector;
