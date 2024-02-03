import useStore from 'hooks/useStore';
import { useEffect, useRef } from 'react';
import FilePreview from './FilePreview';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from "@mui/material/IconButton";

export default function FileInput() {
  const { file, setFile } = useStore(({ file, setFile }) => ({ file, setFile }));
  const inputRef = useRef();

  useEffect(() => {
    if (!file) {
      inputRef.current.value = '';
    }
  }, [file]);

  return (
    <div className=''>
      <input
        type='file'
        id='file'
        accept='image/*, audio/*, video/*'
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: 'none' }}
        ref={inputRef}
      />
        <IconButton
          variant='contained'
          component='label'
          htmlFor='fileInput'
          className=''
          onClick={() => inputRef.current.click()}
          type="button" sx={{ p: '10px' }} aria-label="file">
          <AttachFileIcon />
        </IconButton>
      {file && <FilePreview />}
    </div>
  );
}

