import { useState, useRef, useEffect } from 'react';
import { Slider, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  audioPlayer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
  },
  slider: {
    width: 150,
    margin: theme.spacing(0, 1),
  },
}));

const CustomAudioPlayer = ({ src }) => {
  const classes = useStyles();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      if (audioElement) {
        setCurrentTime(audioElement.currentTime);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (_, newValue) => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const newTime = isNaN(newValue) ? 0 : Math.min(newValue, audioElement.duration);
      audioElement.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
      <div className={classes.audioPlayer}>
        <audio ref={audioRef} src={src} />
        <div className={classes.controls}>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Slider
              className={classes.slider}
              value={currentTime}
              max={audioRef.current && !Number.isNaN(audioRef.current.duration) ? audioRef.current.duration : 0}
              onChange={handleSliderChange}
          />
        </div>
      </div>
  );
};

export default CustomAudioPlayer;
