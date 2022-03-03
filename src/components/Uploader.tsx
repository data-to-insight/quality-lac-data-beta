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
        This tool will load Python code in your web browser to read and validate your SSDA903 data files locally. None of your SSDA903 data will leave your network via this tool. You can safely use it without installing additional software, and without any data sharing agreement. Once the Python code has loaded, the tool will work entirely offline.
      </ GovUK.Paragraph>
      <GovUK.Paragraph>
        To begin, use the boxes below to locate your local SSDA903 file outputs for the relevant year. Choose which validation rules you want to run, and use the “Validate” button to get started.
      </ GovUK.Paragraph>
      <GovUK.Details summary="Instructions">
      <b>1.</b> Add your files to the loading boxes below. If using CSV's, you can validate with any or all of the tables, but validation checks which are missing the necessary data will not run.<br /><br />
      <b>2.</b> Select your Local Authority and the relevant Collection Year.<br /><br />
      <b>3.</b> If you only want to only run the validation for certain rules, use the <b>'Validation Rules'</b> dropdown to select the ones you want.<br /><br />
      <b>4.</b> Click <b>'Validate'</b> to run the selected checks. When complete, the Error Display screen will appear.<br /><br />
      <b>5.</b> On the Error Display screen:
      <ul>
          <li> Use the <b>'Child ID'</b> sidebar to select individual children. </li>
          <li> Use the tabs to see the selected Child ID's data in a particular module. Cells with errors are highlighted in red. </li>
          <li> If you click the <b>'Filter'</b> button, you can type to search for a Child ID, or scroll down and click to display only children with a particular error. </li>
          <li> To download the Error Report spreadsheet, scroll to the bottom of the page and click the <b>'Download Error Reports'</b> button</li>
      </ul>
      </ GovUK.Details>
      <GovUK.GridRow>
           <GovUK.GridCol >
                <GovUK.H3>Ofsted Provider Information Lookup Tables</GovUK.H3>
           </GovUK.GridCol>
      </GovUK.GridRow>
      <GovUK.GridRow>
            <GovUK.GridCol setWidth="one-half">
                <GovUK.H6>Children's Homes List</GovUK.H6>
                <DropzoneUploader description="CH lookup" onFiles={onFilesUploaded} accept='.xlsx,.xlsm,.xls' displayedFiles={currentFiles.filter(f => f.description === 'CH lookup')} />
           </GovUK.GridCol>
           <GovUK.GridCol setWidth="one-half">
                <GovUK.H6>Social Care Providers List</GovUK.H6>
                <DropzoneUploader description="SCP lookup" onFiles={onFilesUploaded} accept='.xlsx,.xlsm,.xls' displayedFiles={currentFiles.filter(f => f.description === 'SCP lookup')} />
           </GovUK.GridCol>
        </GovUK.GridRow><GovUK.GridRow>
            <GovUK.GridCol>
                <GovUK.Paragraph />
                <GovUK.Details summary="Help with adding provider info tables">
                    <GovUK.Paragraph />
                    <GovUK.Paragraph>
                        If you wish to perform the checks concerning providers' details such as URN, postcode, or
                        placement code, add both Ofsted tables to their respective box above.
                    </GovUK.Paragraph><GovUK.Paragraph>
                        You must provide both tables or the upload will fail.
                    </GovUK.Paragraph><GovUK.Paragraph>
                        Note that this will add up to five minutes to the processing time, as reading Excel documents in
                        Pyodide can be very slow!
                    </GovUK.Paragraph>
                </GovUK.Details>
            </GovUK.GridCol>
          </GovUK.GridRow>
          <GovUK.H3>SSDA903 Data</GovUK.H3>
      <GovUK.Tabs>
        <GovUK.Tabs.Title>Locate</GovUK.Tabs.Title>
        <GovUK.Tabs.List>
          <GovUK.Tabs.Tab onClick={() => setFileMode('csv')} selected={fileMode === 'csv'} 
            className={fileMode !== 'csv' && currentFiles.length > 0 ? 'disabledMode' : null}>CSV Files</GovUK.Tabs.Tab>
          <GovUK.Tabs.Tab onClick={() => setFileMode('xml')} selected={fileMode === 'xml'}
            className={fileMode !== 'xml' && currentFiles.length > 0 ? 'disabledMode' : null}>XML Files (Experimental)</GovUK.Tabs.Tab>
        </GovUK.Tabs.List>
        <GovUK.Tabs.Panel selected={fileMode === 'csv'}>
          <GovUK.Details summary="Show column headers required for each CSV file - these must match exactly!">
            <b>Header:</b> <br />CHILD,SEX,DOB,ETHNIC,UPN,MOTHER,MC_DOB
            <br /><br />
            <b>Episodes:</b> <br /> CHILD,DECOM,RNE,LS,CIN,PLACE,PLACE_PROVIDER,DEC,REC,REASON_PLACE_CHANGE,HOME_POST,PL_POST,URN
            <br /><br />
            <b>UASC:</b><br />  CHILD,SEX,DOB,DUC
            <br /><br />
            <b>Outcomes (OC2):</b><br /> CHILD,DOB,SDQ_SCORE,SDQ_REASON,CONVICTED,HEALTH_CHECK,IMMUNISATIONS,TEETH_CHECK,HEALTH_ASSESSMENT,SUBSTANCE_MISUSE,INTERVENTION_RECEIVED,INTERVENTION_OFFERED
            <br /><br />
            <b>Adoption (AD1):</b><br />  CHILD,DOB,DATE_INT,DATE_MATCH,FOSTER_CARE,NB_ADOPTR,SEX_ADOPTR,LS_ADOPTR
            <br /><br />
            <b>Should be Placed for Adoption:</b><br />  CHILD,DOB,DATE_PLACED,DATE_PLACED_CEASED,REASON_PLACED_CEASED
            <br /><br />
            <b>Care Leavers (OC3): </b><br /> CHILD,DOB,IN_TOUCH,ACTIV,ACCOM
            <br /><br />
            <b>Reviews:</b><br />  CHILD,DOB,REVIEW,REVIEW_CODE
            <br /><br />
            <b>Previous Permanence:</b> <br /> CHILD,DOB,PREV_PERM,LA_PERM,DATE_PERM
            <br /><br />
            <b>Missing:</b><br />  CHILD,DOB,MISSING,MIS_START,MIS_END
          </GovUK.Details>

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
          <GovUK.Paragraph>
             There are known issues with XML loading at present; this may or may not work depending on the structure of your file.
          </GovUK.Paragraph>
          <GovUK.Paragraph>
             Please report any issues using the link at the top of this page.
          </GovUK.Paragraph>
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
