import styled from 'styled-components';
import { useCallback, useState, ReactElement } from 'react';
import * as GovUK from 'govuk-react';
import DropzoneUploader from './DropzoneUploader';
import { FilesCallback, UploadedFile, UploadedFilesCallback } from './../types';

interface UploaderProps { 
  currentFiles: Array<UploadedFile>,
  addFileContent: UploadedFilesCallback,
  uploadErrors: Array<any>,
};

const UploaderStyles = styled.div`
.disabled {
  opacity: 50%;
  pointer-events: none;
}

.disabledMode {
  opacity: 50%;
  pointer-events: none;
  text-decoration: line-through;
}
`

export default function Uploader({ currentFiles, addFileContent, uploadErrors }: UploaderProps): ReactElement {
  const [fileMode, setFileMode] = useState('csv');

  const onFilesUploaded = useCallback<FilesCallback>(({description, acceptedFiles}) => {
    acceptedFiles.forEach( file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('File reading failed.')
      reader.onerror = () => console.log('File reading error.')
      reader.onload = () =>  {
        const fileText = reader.result as string;
        console.log(`Finished reading (${description}) file ${file.name}.`);
        addFileContent({name: file.name, description, fileText });
      }

      reader.readAsText(file);
    })
  }, [addFileContent])

  return (
    <UploaderStyles>
      <GovUK.Paragraph>
        This tool will not send data to any third party. It uses the browser as an application to locate files in your computer and run scripts
        on them to identify errors. Once the browser is loaded, you can locate the files and run the validation offline.
      </GovUK.Paragraph>
      
      <GovUK.Tabs>
        <GovUK.Tabs.Title>Upload</GovUK.Tabs.Title>
        <GovUK.Tabs.List>
          <GovUK.Tabs.Tab onClick={() => setFileMode('csv')} selected={fileMode === 'csv'} 
            className={fileMode !== 'csv' && currentFiles.length > 0 ? 'disabledMode' : null}>CSV Upload</GovUK.Tabs.Tab>
          <GovUK.Tabs.Tab onClick={() => setFileMode('xml')} selected={fileMode === 'xml'}
            className={fileMode !== 'xml' && currentFiles.length > 0 ? 'disabledMode' : null}>XML Upload</GovUK.Tabs.Tab>
        </GovUK.Tabs.List>
        <GovUK.Tabs.Panel selected={fileMode === 'csv'}>
          <GovUK.GridRow>
            <GovUK.GridCol>
              <GovUK.H6>This year</GovUK.H6>
              <DropzoneUploader description='This year (CSV)' onFiles={onFilesUploaded} accept='.csv'/>
            </GovUK.GridCol>
            <GovUK.GridCol setWidth="one-half" className={currentFiles.length > 0 ? null : 'disabled'}>
              <GovUK.H6>Previous year</GovUK.H6>
              <DropzoneUploader description='Prev year (CSV)' onFiles={onFilesUploaded} accept='.csv'/>
            </GovUK.GridCol>
          </GovUK.GridRow>
        </GovUK.Tabs.Panel>
        <GovUK.Tabs.Panel selected={fileMode === 'xml'}>
          <GovUK.GridRow>
            <GovUK.GridCol>
              <GovUK.H6>This year</GovUK.H6>
              <DropzoneUploader description='This year (XML)' onFiles={onFilesUploaded} accept='.xml'/>
            </GovUK.GridCol>
            <GovUK.GridCol setWidth="one-half" className={currentFiles.length > 0 ? null : 'disabled'}>
              <GovUK.H6>Previous year</GovUK.H6>
              <DropzoneUploader description='Prev year (XML)' onFiles={onFilesUploaded} accept='.xml'/>
            </GovUK.GridCol>
          </GovUK.GridRow>
        </GovUK.Tabs.Panel>
      </GovUK.Tabs>

      <GovUK.Details summary="Uploaded files" open={currentFiles.length > 0}>
        {Array.from((new Set(currentFiles.map(({description}) => description))).entries(), ([index, description]) => {
          let matchingFiles = currentFiles.filter(({description: fileDescription}) => fileDescription === description)

          return (
            <div key={index}>
            <GovUK.Paragraph>{description}</GovUK.Paragraph>
            <GovUK.UnorderedList>
              {Array.from(matchingFiles.entries(), ([i, { name }]) => <GovUK.ListItem key={i}>{name}</GovUK.ListItem>)}
            </GovUK.UnorderedList>
            </div>
          )
        })}
      </GovUK.Details>
      {uploadErrors.length > 0
        ? (
          <GovUK.Details summary="Errors" open>
            {Array.from(uploadErrors.entries(), ([i, error]) => <GovUK.ErrorText key={i}>{error.toString()}</GovUK.ErrorText>)}
          </GovUK.Details>
        )
        : null
      }
    </UploaderStyles>
  )
}
