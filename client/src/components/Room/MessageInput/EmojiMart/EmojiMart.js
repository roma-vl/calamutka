import Picker from '@emoji-mart/react'
import useStore from 'hooks/useStore'
import {useCallback, useEffect} from 'react'
import IconButton from "@mui/material/IconButton";
import AddReactionIcon from '@mui/icons-material/AddReaction';

export default function EmojiMart({setText, messageInput}) {
  const {showEmoji, setShowEmoji, showPreview} = useStore(
    ({showEmoji, setShowEmoji, showPreview}) => ({
      showEmoji,
      setShowEmoji,
      showPreview
    })
  )

  const onKeydown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setShowEmoji(false)
      }
    },
    [setShowEmoji]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])

  const onSelect = ({native}) => {
    console.log(native)
    console.log(messageInput)
    setText((messageInput) => messageInput + native)
    messageInput.focus()
  }

  return (
    <div className='container emoji'>
      <IconButton
        className='btn'
        type='button'
        onClick={() => setShowEmoji(!showEmoji)}
        disabled={showPreview}
      >
        <AddReactionIcon/>
      </IconButton>

      {showEmoji && (
        <Picker
          onSelect={onSelect}
          emojiSize={20}
          showPreview={false}
          perLine={6}
        />
      )}
    </div>
  )
}
