import * as GovUK from 'govuk-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Uploader({ setReady, addFileContent }) {
  const onFilesUploaded = useCallback(({description, acceptedFiles}) => {
    acceptedFiles.forEach( file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('File reading failed.')
      reader.onerror = () => console.log('File reading error.')
      reader.onload = () =>  {
        const fileText = reader.result;
        console.log(`Finished reading (${description}) file ${file.name}.`);
        addFileContent(file.name, fileText);
      }

      reader.readAsText(file);
    })
  }, [addFileContent])

  return (
    <>
    <GovUK.Paragraph>
      This tool will not send data to any third party. It uses the browser as an application to locate files in your computer and run scripts
      on them to identify errors. Once the browser is loaded, you can locate the files and run the validation offline.
    </GovUK.Paragraph>
    <GovUK.Paragraph>Upload either CSV or XML files.</GovUK.Paragraph>

    <GovUK.H3>CSV Upload</GovUK.H3>
    <GovUK.GridRow mb={8}>
      <GovUK.GridCol setWidth="one-half">
        <GovUK.H6>Previous year</GovUK.H6>
        <DropzoneUploader description='prevYear' onFiles={onFilesUploaded} accept='.csv'/>
      </GovUK.GridCol>
      <GovUK.GridCol>
        <GovUK.H6>This year</GovUK.H6>
        <DropzoneUploader description='thisYear' onFiles={onFilesUploaded} accept='.csv'/>
      </GovUK.GridCol>
    </GovUK.GridRow>

    <GovUK.H3>XML Upload</GovUK.H3>
    <GovUK.GridRow mb={8}>
      <GovUK.GridCol setWidth="one-half">
        <GovUK.H6>Previous year</GovUK.H6>
        <DropzoneUploader description='prevYear' onFiles={onFilesUploaded} accept='.xml'/>
      </GovUK.GridCol>
      <GovUK.GridCol>
        <GovUK.H6>This year</GovUK.H6>
        <DropzoneUploader description='thisYear' onFiles={onFilesUploaded} accept='.xml'/>
      </GovUK.GridCol>
    </GovUK.GridRow>

    <GovUK.GridRow>
      <GovUK.GridCol>
        <GovUK.Button onClick={() => setReady(true)}>
          Validate
        </GovUK.Button>
      </GovUK.GridCol>
      <GovUK.GridCol>
        <GovUK.Link as={Link} to="/">Go back</GovUK.Link>
      </GovUK.GridCol>
    </GovUK.GridRow>
    </>
  )
}

const UploadStyle = styled.div`
  border: 2px dashed #999999;
  padding: 5px;
  color: #666666;
`

function DropzoneUploader({onFiles, description, accept}) {
  let [error, setError] = useState();

  const onDrop = (acceptedFiles, rejectedFiles) => {
    onFiles({ description, acceptedFiles });
    rejectedFiles.forEach( file => {
      setError(file.errors[0].message)
    });
  }

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