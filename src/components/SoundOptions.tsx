
import { Card } from '@/components/ui/card';
import { Volume2, Volume, VolumeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SoundOption {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface SoundOptionsProps {
  sounds: SoundOption[];
  selectedSound: SoundOption;
  onSelectSound: (sound: SoundOption) => void;
}

const SoundOptions = ({ sounds, selectedSound, onSelectSound }: SoundOptionsProps) => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <h3 className="text-lg font-medium mb-2">Choose a sound</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sounds.map((sound) => (
          <Card 
            key={sound.id} 
            className={cn(
              "p-4 cursor-pointer relative sound-card card-glow",
              selectedSound.id === sound.id 
                ? "border-2 border-baby-400 bg-baby-50" 
                : "border border-baby-100 bg-white"
            )}
            onClick={() => onSelectSound(sound)}
          >
            <div className="flex flex-col items-center text-center">
              <SoundIcon className="h-10 w-10 mb-2 text-baby-500" />
              <h3 className="font-medium text-base">{sound.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{sound.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Custom sound icon based on type
const SoundIcon = ({ className }: { className?: string }) => {
  return <Volume2 className={className} />;
};

export default SoundOptions;
