import styled from 'styled-components';
import { useCallback, useState, ReactElement } from 'react';
import * as GovUK from 'govuk-react';
import DropzoneUploader from './DropzoneUploader';
import { ErrorSelected, FilesCallback, UploadedFile, UploadedFilesCallback } from './../types';

interface UploaderProps { 
  currentFiles: Array<UploadedFile>,
  addFileContent: UploadedFilesCallback,
  uploadErrors: Array<any>,
  selectedErrors: Array<ErrorSelected>,
  setSelectedErrors: (arg1: Array<ErrorSelected>) => void;
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

export default function Uploader({ currentFiles, addFileContent, uploadErrors, selectedErrors, setSelectedErrors }: UploaderProps): ReactElement {
  const [fileMode, setFileMode] = useState('csv');

  const onFilesUploaded = useCallback<FilesCallback>(({description, acceptedFiles}) => {
    acceptedFiles.forEach( file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('File reading failed.')
      reader.onerror = () => console.log('File reading error.')
      reader.onload = () =>  {
        const fileText = reader.result as ArrayBuffer;
        console.log(`Finished reading (${description}) file ${file.name}.`);
        addFileContent({name: file.name, description, fileText });
      }

      reader.readAsArrayBuffer(file);
    })
  }, [addFileContent])

  return (
    <UploaderStyles>
      <GovUK.Paragraph>
        This tool will not send data to any third party. It uses the browser as an application to locate files in your computer and run scripts
        on them to identify errors. Once the browser is loaded, you can locate the files and run the validation offline.
      </GovUK.Paragraph>
      
      <GovUK.Tabs>
        <GovUK.Tabs.Title>Locate</GovUK.Tabs.Title>
        <GovUK.Tabs.List>
          <GovUK.Tabs.Tab onClick={() => setFileMode('csv')} selected={fileMode === 'csv'} 
            className={fileMode !== 'csv' && currentFiles.length > 0 ? 'disabledMode' : null}>CSV Files</GovUK.Tabs.Tab>
          <GovUK.Tabs.Tab onClick={() => setFileMode('xml')} selected={fileMode === 'xml'}
            className={fileMode !== 'xml' && currentFiles.length > 0 ? 'disabledMode' : null}>XML Files</GovUK.Tabs.Tab>
        </GovUK.Tabs.List>
        <GovUK.Tabs.Panel selected={fileMode === 'csv'}>
          <GovUK.GridRow>
            <GovUK.GridCol>
              <GovUK.H6>This year</GovUK.H6>
              <DropzoneUploader description='This year (CSV)' onFiles={onFilesUploaded} accept='.csv' displayedFiles={currentFiles.filter(f => f.description === 'This year (CSV)')} />
            </GovUK.GridCol>
            <GovUK.GridCol setWidth="one-half" className={currentFiles.length > 0 ? null : 'disabled'}>
              <GovUK.H6>Previous year</GovUK.H6>
              <DropzoneUploader description='Prev year (CSV)' onFiles={onFilesUploaded} accept='.csv' displayedFiles={currentFiles.filter(f => f.description === 'Prev year (CSV)')} />
            </GovUK.GridCol>
          </GovUK.GridRow>
        </GovUK.Tabs.Panel>
        <GovUK.Tabs.Panel selected={fileMode === 'xml'}>
          <GovUK.GridRow>
            <GovUK.GridCol>
              <GovUK.H6>This year</GovUK.H6>
              <DropzoneUploader description='This year (XML)' onFiles={onFilesUploaded} accept='.xml' displayedFiles={currentFiles.filter(f => f.description === 'This year (XML)')} />
            </GovUK.GridCol>
            <GovUK.GridCol setWidth="one-half" className={currentFiles.length > 0 ? null : 'disabled'}>
              <GovUK.H6>Previous year</GovUK.H6>
              <DropzoneUploader description='Prev year (XML)' onFiles={onFilesUploaded} accept='.xml' displayedFiles={currentFiles.filter(f => f.description === 'Prev year (XML)')} />
            </GovUK.GridCol>
          </GovUK.GridRow>
        </GovUK.Tabs.Panel>
      </GovUK.Tabs>

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
