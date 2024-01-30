import { useState, useRef } from 'react';
import { Slider, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  videoPlayer: {
    position: 'relative',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(1),
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  controlsVisible: {
    opacity: 1,
  },
  slider: {
    width: '80%',
    margin: theme.spacing(0, 1),
  },
}));

const CustomVideoPlayer = ({ src, width }) => {
  const classes = useStyles();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [areControlsVisible, setAreControlsVisible] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSliderChange = (_, newValue) => {
    videoRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  const showControls = () => {
    setAreControlsVisible(true);
  };

  const hideControls = () => {
    setAreControlsVisible(false);
  };

  return (
    <div
      className={classes.videoPlayer}
      onMouseEnter={showControls}
      onMouseLeave={hideControls}
      style={{ width }}
    >
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className={classes.video}
      />
      <div className={`${classes.controls} ${areControlsVisible && classes.controlsVisible}`}>
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Slider
            className={classes.slider}
            value={Number.isNaN(currentTime) ? 0 : currentTime}
            max={videoRef.current && !Number.isNaN(videoRef.current.duration) ? videoRef.current.duration : 0}
            onChange={handleSliderChange}
        />

        <IconButton onClick={handleFullScreen}>
          <FullscreenIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
