
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface AudioControllerProps {
  soundUrl: string;
  isPlaying: boolean;
  volume: number;
  timerMinutes: number | null;
  onTimerEnd: () => void;
}

const AudioController = ({ 
  soundUrl, 
  isPlaying, 
  volume, 
  timerMinutes, 
  onTimerEnd 
}: AudioControllerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { toast } = useToast();

  // Initialize audio element
  useEffect(() => {
    // Clear any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current = null;
    }

    // Create new audio element with improved loading
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";
    audio.loop = true;
    audio.src = soundUrl;
    audioRef.current = audio;
    
    // Add error handler for audio loading issues
    const handleAudioError = () => {
      console.error("Error loading audio:", soundUrl);
      toast({
        title: "Audio Error",
        description: "There was a problem playing the selected sound.",
        variant: "destructive",
      });
    };
    
    audio.addEventListener('error', handleAudioError);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [soundUrl, toast]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio play failed:", error);
            toast({
              title: "Playback Error",
              description: "Unable to play the sound. Try another sound.",
              variant: "destructive",
            });
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, soundUrl, toast]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle timer
  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Set remaining time to display
    if (timerMinutes && isPlaying) {
      const milliseconds = timerMinutes * 60 * 1000;
      setRemainingTime(milliseconds);
      
      // Create new timer
      timerRef.current = setTimeout(() => {
        onTimerEnd();
        setRemainingTime(null);
      }, milliseconds);
    } else {
      setRemainingTime(null);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerMinutes, isPlaying, onTimerEnd]);

  // Update remaining time countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (remainingTime && isPlaying) {
      interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev && prev > 1000) {
            return prev - 1000;
          } else {
            if (interval) clearInterval(interval);
            return null;
          }
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [remainingTime, isPlaying]);

  return null; // This is a non-visual component
};

export default AudioController;
