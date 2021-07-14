import * as GovUK from 'govuk-react';
import { useCallback, useState, ReactElement } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FilesCallback, UploadedFile } from './../types';

interface DropzoneUploaderProps {
  onFiles: FilesCallback,
  description: string,
  accept: string,
  displayedFiles: Array<UploadedFile>
};

const UploadStyle = styled.div`
  border: 2px dashed #999999;
  padding: 5px;
  color: #666666;

  ul, li {
    color: #666666;
  }
`

export default function DropzoneUploader({onFiles, description, accept, displayedFiles}: DropzoneUploaderProps): ReactElement {
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
    } else if (displayedFiles.length === 0) {
      return <p>Drag and drop some files here, or click to select files</p>
    } else {
      return null
    }
  }

  return (
    <UploadStyle {...getRootProps()}>
      <input {...getInputProps()} />
      {displayedFiles.length > 0 && (
        <>
        <GovUK.Paragraph mb={1}>Located files (click to add more):</GovUK.Paragraph>
        <GovUK.UnorderedList mb={1}>{displayedFiles.map(file => <GovUK.ListItem>{file.name}</GovUK.ListItem>)}</GovUK.UnorderedList>
        </>
      )}
      {displayText()}
    </UploadStyle>
  )
}