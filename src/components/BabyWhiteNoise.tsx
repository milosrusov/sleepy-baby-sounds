
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Baby, Play, Pause } from 'lucide-react';
import AudioController from './AudioController';
import SoundOptions from './SoundOptions';
import TimerSelector from './TimerSelector';
import VolumeControl from './VolumeControl';
import { useToast } from '@/components/ui/use-toast';

// Sound database with alternative sources
// const SOUNDS = [
//   { 
//     id: 'white-noise', 
//     name: 'White Noise', 
//     description: 'Steady, consistent noise',
//     url: 'https://freesound.org/data/previews/133/133099_2105621-lq.mp3'
//   },
//   { 
//     id: 'heartbeat', 
//     name: 'Heartbeat', 
//     description: 'Soothing womb sounds',
//     url: 'https://freesound.org/data/previews/362/362044_2626385-lq.mp3'
//   },
//   { 
//     id: 'rain', 
//     name: 'Rain', 
//     description: 'Gentle rainfall sounds',
//     url: 'https://freesound.org/data/previews/531/531953_7546112-lq.mp3'
//   },
//   { 
//     id: 'ocean', 
//     name: 'Ocean Waves', 
//     description: 'Calm sea sounds',
//     url: 'https://freesound.org/data/previews/527/527408_5038-lq.mp3'
//   },
//   { 
//     id: 'lullaby', 
//     name: 'Lullaby', 
//     description: 'Gentle music for sleep',
//     url: 'https://ia800305.us.archive.org/7/items/LullabiesLullabyForBabiesToGoToSleepBabySongSleepMusicBabySleepingSongsBedtimeSo/4%20HOURS%20of%20BRAHMS%20LULLABY%20BABY%20SLEEP%20MUSIC%20BABY%20RELAXING%20MUSIC%20BEDTIME.mp3'
//   },
//   { 
//     id: 'shushing', 
//     name: 'Shushing', 
//     description: 'Calming parental shush',
//     url: 'https://freesound.org/data/previews/242/242008_4322383-lq.mp3'
//   }
// ];

const SOUNDS = [
  { 
    id: 'white-noise', 
    name: 'White Noise', 
    description: 'Steady, consistent noise',
    url: '/sounds/white-noise.mp3'
  },
  { 
    id: 'spring-forest', 
    name: 'Spring Forest', 
    description: 'Gentle forest sounds',
    url: '/sounds/spring-forest.mp3'
  },
  { 
    id: 'rain', 
    name: 'Rain', 
    description: 'Gentle rainfall sounds',
    url: '/sounds/rain.mp3'
  },
  { 
    id: 'ocean', 
    name: 'Ocean Waves', 
    description: 'Calm sea sounds',
    url: '/sounds/ocean.mp3'
  },
  { 
    id: 'lullaby', 
    name: 'Lullaby', 
    description: 'Gentle music for sleep',
    url: '/sounds/lullaby.mp3'
  },
  { 
    id: 'shushing', 
    name: 'Shushing', 
    description: 'Calming parental shush',
    url: '/sounds/shushing.mp3'
  }
];


const BabyWhiteNoise = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSound, setSelectedSound] = useState(SOUNDS[0]);
  const [volume, setVolume] = useState(0.5);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { toast } = useToast();

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
    
    if (!isPlaying) {
      toast({
        title: "Sound started",
        description: `Playing ${selectedSound.name}`,
        duration: 2000,
      });
    }
  };

  const handleTimerEnd = () => {
    setIsPlaying(false);
    setTimerMinutes(null);
    
    toast({
      title: "Sleep timer ended",
      description: "Sound has stopped playing",
      duration: 3000,
    });
  };

  const handleSoundSelect = (sound: typeof SOUNDS[0]) => {
    setSelectedSound(sound);
    if (isPlaying) {
      toast({
        title: "Sound changed",
        description: `Now playing ${sound.name}`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-3 my-6">
          <Baby className="h-8 w-8 text-baby-500 animate-float" />
          <h1 className="text-3xl font-bold text-baby-700">Baby Sound Soother</h1>
        </div>
        
        <Card className="w-full p-6 bg-white shadow-lg rounded-2xl card-glow">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-center">
              <Button
                onClick={handlePlayPause}
                className={`rounded-full h-16 w-16 flex items-center justify-center ${
                  isPlaying ? 'bg-baby-600' : 'bg-baby-500'
                } hover:${isPlaying ? 'bg-baby-700' : 'bg-baby-600'}`}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
            </div>
            
            <SoundOptions 
              sounds={SOUNDS} 
              selectedSound={selectedSound} 
              onSelectSound={handleSoundSelect} 
            />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Volume</h3>
              <VolumeControl volume={volume} onChange={setVolume} />
            </div>
            
            <TimerSelector 
              onSelectTimer={setTimerMinutes} 
              selectedTimer={timerMinutes} 
            />
            
            <AudioController
              soundUrl={selectedSound.url}
              isPlaying={isPlaying}
              volume={volume}
              timerMinutes={timerMinutes}
              onTimerEnd={handleTimerEnd}
            />
          </div>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Helping babies sleep soundly</p>
        </div>
      </div>
    </div>
  );
};

export default BabyWhiteNoise;
