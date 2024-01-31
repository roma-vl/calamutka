import useStore from 'hooks/useStore'
import {useEffect, useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import CustomAudioPlayer from "../../MessageList/Audio";
import CustomVideoPlayer from "../../MessageList/Video";

export default function FilePreview() {
  const {file, setFile} = useStore(({file, setFile}) => ({file, setFile}))
  const [src, setSrc] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    if (file) {
      setSrc(URL.createObjectURL(file))
      setType(file.type.split('/')[0])
    }
  }, [file])

  let element

  switch (type) {
    case 'image':
      element = <img src={src} alt={file.name}/>
      break
    case 'audio':
      element = <CustomAudioPlayer src={src}></CustomAudioPlayer>;
      break
    case 'video':
      element = <CustomVideoPlayer src={src}></CustomVideoPlayer>;
      break
    default:
      element = null
      break
  }

  return (
    <div className='container preview'>
      {element}

      <button
        type='button'
        className='btn close'
        onClick={() => setFile(null)}
      >
        <AiOutlineClose className='icon close'/>
      </button>
    </div>
  )
}
