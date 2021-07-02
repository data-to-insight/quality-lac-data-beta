import * as GovUK from 'govuk-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

export default function Uploader({ currentFiles, addFileContent }) {
  const [tabIndex, setTabIndex] = useState(0);

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
    
    <GovUK.Tabs>
      <GovUK.Tabs.Title>Upload</GovUK.Tabs.Title>
      <GovUK.Tabs.List>
        <GovUK.Tabs.Tab onClick={() => setTabIndex(0)} selected={tabIndex === 0}>CSV Upload</GovUK.Tabs.Tab>
        <GovUK.Tabs.Tab onClick={() => setTabIndex(1)} selected={tabIndex === 1}>XML Upload</GovUK.Tabs.Tab>
      </GovUK.Tabs.List>
      <GovUK.Tabs.Panel selected={tabIndex === 0}>
        <GovUK.GridRow>
          <GovUK.GridCol setWidth="one-half">
            <GovUK.H6>Previous year</GovUK.H6>
            <DropzoneUploader description='prevYear' onFiles={onFilesUploaded} accept='.csv'/>
          </GovUK.GridCol>
          <GovUK.GridCol>
            <GovUK.H6>This year</GovUK.H6>
            <DropzoneUploader description='thisYear' onFiles={onFilesUploaded} accept='.csv'/>
          </GovUK.GridCol>
        </GovUK.GridRow>
      </GovUK.Tabs.Panel>
      <GovUK.Tabs.Panel selected={tabIndex === 1}>
        <GovUK.GridRow>
          <GovUK.GridCol setWidth="one-half">
            <GovUK.H6>Previous year</GovUK.H6>
            <DropzoneUploader description='prevYear' onFiles={onFilesUploaded} accept='.xml'/>
          </GovUK.GridCol>
          <GovUK.GridCol>
            <GovUK.H6>This year</GovUK.H6>
            <DropzoneUploader description='thisYear' onFiles={onFilesUploaded} accept='.xml'/>
          </GovUK.GridCol>
        </GovUK.GridRow>
      </GovUK.Tabs.Panel>
    </GovUK.Tabs>

    <GovUK.Details summary="Uploaded files">
      <GovUK.UnorderedList>
        {Object.keys(currentFiles).map(key => <GovUK.ListItem key={key}>{key.toString()}</GovUK.ListItem>)}
      </GovUK.UnorderedList>
    </GovUK.Details>

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