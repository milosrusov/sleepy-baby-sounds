
import { useState, useRef, useEffect } from 'react';

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

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(soundUrl);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundUrl]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, soundUrl]);

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
