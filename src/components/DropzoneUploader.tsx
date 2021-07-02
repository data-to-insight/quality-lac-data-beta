import { useCallback, useState, ReactElement } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FilesCallback } from './../types';

interface DropzoneUploaderProps {
  onFiles: FilesCallback,
  description: string,
  accept: string,
};

const UploadStyle = styled.div`
  border: 2px dashed #999999;
  padding: 5px;
  color: #666666;
`

export default function DropzoneUploader({onFiles, description, accept}: DropzoneUploaderProps): ReactElement {
  let [error, setError] = useState<string | null>();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      onFiles({ description, acceptedFiles });

      rejectedFiles.forEach( (file: FileRejection) => {
        setError(file.errors[0].message)
      });
  }, [setError, description, onFiles])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept})

  const displayText = () => {
    if (error) {
      return <p style={{color: 'red'}}>{error}</p>
    } else if (isDragActive) {
      return <p>Drop the files here ...</p>
    } else {
      return <p>Drag and drop some files here, or click to select files</p>
    }
  }

  return (
    <UploadStyle {...getRootProps()}>
      <input {...getInputProps()} />
      {displayText()}
    </UploadStyle>
  )
}