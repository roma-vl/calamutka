import {CgTrashEmpty} from 'react-icons/cg';
import {GiSpeaker} from 'react-icons/gi';
import {useSpeechSynthesis} from 'react-speech-kit';
import TimeAgo from 'react-timeago';
import {SERVER_URI} from 'constants.js';
import './MessageItem.css';
import CustomAudioPlayer from "./Audio";
import CustomVideoPlayer from "./Video";
import IconButton from "@mui/material/IconButton";
import {useSelector} from "react-redux";

export default function MessageItem({message, removeMessage}) {
  const user = useSelector(state => state.user.userData);
  const {speak, voices} = useSpeechSynthesis();
  const lang = document.documentElement.lang || 'en';
  const voice = voices.find((v) => v.lang.includes(lang) && v.name.includes('Google'));

  const {messageType, textOrPathToFile} = message;
  const pathToFile = `${SERVER_URI}/files${textOrPathToFile}`;

  let element;
  let isMyMessage;

  switch (messageType) {
    case 'text':
      element = (
        <>
          <IconButton
            className='btn btn_speak'
            onClick={() => speak({text: textOrPathToFile, voice})}
          >
            <GiSpeaker className='icon speak'/>
          </IconButton>
          <p>{textOrPathToFile}</p>
        </>
      );
      break;
    case 'image':
      element = <img src={pathToFile} alt='' width="100%"/>;
      break;
    case 'audio':
      element = <CustomAudioPlayer src={pathToFile}></CustomAudioPlayer>;
      break;
    case 'video':
      element = <CustomVideoPlayer src={pathToFile}></CustomVideoPlayer>;
      break;
    default:
      return null;
  }

  if (user) {
    isMyMessage = user.id == message.userId;
  }
  return user && (
    <li className={`item message ${isMyMessage ? 'my' : ''}`}>
      <span className='username'>{isMyMessage ? 'Me' : message.authorName}</span>
      <div className='inner'>
        {element}

        {isMyMessage && (
          <IconButton className='btn btn_remove ' onClick={() => removeMessage(message)}>
            <CgTrashEmpty className='icon remove'/>
          </IconButton>
        )}
      </div>

      <p className='datetime'>
        <TimeAgo date={message.created_at}/>
      </p>
    </li>
  );
}
