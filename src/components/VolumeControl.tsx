
import { VolumeOff, Volume1, Volume2 } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onChange }: VolumeControlProps) => {
  const handleVolumeChange = (value: number[]) => {
    onChange(value[0]);
  };
  
  return (
    <div className="flex items-center space-x-3">
      <button 
        onClick={() => onChange(volume > 0 ? 0 : 0.5)}
        className="p-2 rounded-full hover:bg-baby-100 transition-colors"
        aria-label={volume === 0 ? "Unmute" : "Mute"}
      >
        {volume === 0 ? (
          <VolumeOff className="h-5 w-5 text-baby-500" />
        ) : volume < 0.5 ? (
          <Volume1 className="h-5 w-5 text-baby-500" />
        ) : (
          <Volume2 className="h-5 w-5 text-baby-500" />
        )}
      </button>
      
      <div className="w-full flex-1">
        <Slider
          defaultValue={[volume]}
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VolumeControl;
