import * as GovUK from 'govuk-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Uploader() {
  const onFilesUploaded = useCallback(acceptedFiles => console.log(acceptedFiles), [])

  return (
    <>
    <GovUK.Paragraph>
      This tool will not send data to any third party. It uses the browser as an application to locate files in your computer and run scripts
      on them to identify errors. Once the browser is loaded, you can locate the files and run the validation offline.
    </GovUK.Paragraph>
    <GovUK.Paragraph>Upload either CSV or XML files.</GovUK.Paragraph>

    <GovUK.H3>CSV Upload</GovUK.H3>
    <GovUK.GridRow mb={8}>
      <GovUK.GridCol>
        <GovUK.H6>Previous year</GovUK.H6>
        <DropzoneUploader onDrop={onFilesUploaded} />
      </GovUK.GridCol>
      <GovUK.GridCol>
        <GovUK.H6>This year</GovUK.H6>
        <DropzoneUploader onDrop={onFilesUploaded} />
      </GovUK.GridCol>
    </GovUK.GridRow>

    <GovUK.H3>XML Upload</GovUK.H3>
    <GovUK.GridRow mb={8}>
      <GovUK.GridCol>
        <GovUK.H6>Previous year</GovUK.H6>
        <DropzoneUploader onDrop={onFilesUploaded} />
      </GovUK.GridCol>
      <GovUK.GridCol>
        <GovUK.H6>This year</GovUK.H6>
        <DropzoneUploader onDrop={onFilesUploaded} />
      </GovUK.GridCol>
    </GovUK.GridRow>

    <GovUK.GridRow>
      <GovUK.GridCol>
        <GovUK.Button as={Link} to="/application">
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


const BoxStyle = styled.div`
  border: 2px dashed #999999;
  padding: 5px;
  color: #666666;
`

function DropzoneUploader({onDrop}) {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
    <BoxStyle {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop some files here, or click to select files</p>
      }
    </BoxStyle>
  )
}