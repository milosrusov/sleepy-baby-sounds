
import { VolumeOff, Volume1, Volume2 } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onChange }: VolumeControlProps) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onChange(newVolume);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onChange(volume > 0 ? 0 : 0.5)}
        className="p-2 rounded-full hover:bg-baby-100 transition-colors"
      >
        {volume === 0 ? (
          <VolumeOff className="h-5 w-5 text-baby-500" />
        ) : volume < 0.5 ? (
          <Volume1 className="h-5 w-5 text-baby-500" />
        ) : (
          <Volume2 className="h-5 w-5 text-baby-500" />
        )}
      </button>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider flex-1"
      />
    </div>
  );
};

export default VolumeControl;
