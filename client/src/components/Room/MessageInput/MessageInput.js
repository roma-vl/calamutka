import fileApi from 'api/file.api'
import {USER_KEY} from 'constants.js'
import useStore from 'hooks/useStore'
import {nanoid} from 'nanoid'
import {useEffect, useRef, useState} from 'react'
import storage from 'utils/storage'
import EmojiMart from './EmojiMart/EmojiMart'
import FileInput from './FileInput/FileInput'
import Recorder from './Recorder/Recorder'
import SendIcon from "@mui/icons-material/Send";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

export default function MessageInput({sendMessage}) {
  const user = storage.get(USER_KEY)
  const state = useStore((state) => state)
  const {file, setFile, showPreview, setShowPreview, showEmoji, setShowEmoji } = state
  const [text, setText] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const inputRef = useRef()

  useEffect(() => {
    setSubmitDisabled(!text.trim() && !file)
  }, [text, file])

  useEffect(() => {
    setShowPreview(file)
  }, [file, setShowPreview])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (submitDisabled) return

    const {userId, userName, roomId} = user
    let message = {
      messageId: nanoid(),
      userId,
      userName,
      roomId
    }

    if (!file) {
      message.messageType = 'text'
      message.textOrPathToFile = text
      sendMessage(message)
    } else {

      try {
        const path = await fileApi.upload({file, roomId})

        message.messageType = file.type.split('/')[0]
        message.textOrPathToFile = path
        sendMessage(message)
      } catch (e) {
        console.error(e)
      }
    }

    if (showEmoji) {
      setShowEmoji(false)
    }

    setText('')
    setFile(null)
  }

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 320}}
    >
      <EmojiMart setText={setText} messageInput={text}/>
      <FileInput/>
      <Recorder/>
      <InputBase
        type='text'
        autoFocus
        placeholder='Message...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        disabled={showPreview}
        sx={{
          flexGrow: 1,
          marginRight: 1,
          padding: 1,
          backgroundColor: 'white',
          border: '1px solid primary.main',
          borderRadius: 1,
          color: 'black',
          width: '85%',
        }}
      />
      <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
      <IconButton
        variant="contained"
        type='submit'
        disabled={submitDisabled}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          minWidth: 'fit-content',
          padding: '8px 12px',
          borderRadius: 1,
          width: '15%',
        }}
      >
        <SendIcon sx={{marginLeft: 1}}/>
      </IconButton>
    </Paper>
  )
}
