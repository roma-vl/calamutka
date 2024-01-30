import useStore from 'hooks/useStore'
import {useState} from 'react'
import RecordingModal from './RecordingModal'
import IconButton from "@mui/material/IconButton";
import MicIcon from '@mui/icons-material/Mic';

export default function Recorder() {
  const showPreview = useStore(({showPreview}) => showPreview)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='container recorder'>
      <IconButton
        type='button'
        className='btn'
        onClick={() => setShowModal(true)}
        disabled={showPreview}
      >
        <MicIcon/>
      </IconButton>
      {showModal && <RecordingModal setShowModal={setShowModal}/>}
    </div>
  )
}
