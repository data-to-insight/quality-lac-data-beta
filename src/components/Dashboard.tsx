import * as GovUK from 'govuk-react';
import { Spinner } from '@govuk-react/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { handleUploaded903Data, loadErrorDefinitions, loadPyodide } from '../api';
import Validator from "./Validator";
import Uploader from "./Uploader";
import {
  ErrorSelected,
  UploadedFile,
  UploadedFilesCallback,
  UploadMetadata,
  ValidatedData
} from '../types';
import { useMemo } from 'react';
import {
  saveErrorSummary, saveLoadedFiles,
} from "../helpers/report/childErrorReport";
import {laData} from "../helpers/authorityData";
import {event} from "../helpers/googleAnalytics";

export default function Dashboard() {
  const [loadingText, setLoadingText] = useState("Loading Python initially (takes around 30 seconds)...");
  const [fileContents, setFileContents] = useState<Array<UploadedFile>>([]);
  const [uploadErrors, setUploadErrors] = useState<Array<any>>([]);
  const [validatedData, setValidatedData] = useState<ValidatedData | null>();
  const [selectedErrors, setSelectedErrors] = useState<Array<ErrorSelected>>([]);
  const [localAuthority, setLocalAuthority] = useState<string>(laData[0].la_id);

  const collectionYears = useMemo(() => getCollectionYears(5), []);
  const [collectionYear, setCollectionYear] = useState<string>(collectionYears[0]);

  useEffect(() => {
    (async () => {
      await loadPyodide();
      event('pyodide', 'loaded')
      let selectedErrors = await loadErrorDefinitions();
      setSelectedErrors(selectedErrors);
      setLoadingText("");
    })();
  }, [])

  const addFileContent = useCallback<UploadedFilesCallback>(uploadedFile => {
    event('click', 'addFile')
    fileContents.push(uploadedFile); // We have to push to the old state in case the callback isn't updated in children
    setFileContents([...fileContents]);
  }, [fileContents])

  const clearAndRestart = useCallback(() => {
    event('click', 'clear')
    setUploadErrors([]);
    setValidatedData(null);
    setFileContents([]);
  }, [])

  const runValidation = useCallback(async () => {
    event('click', 'validate');
    let storedValue = window.localStorage.getItem('localAuthority');
    if (storedValue) {
      event('validate', 'LA_known', storedValue);
    } else {
      event('validate', 'no_LA');
    }

    setUploadErrors([]);
    setLoadingText("Loading postcode file (initial load takes 60 seconds)...");
    const metadata: UploadMetadata = {
      localAuthority: localAuthority as string,
      collectionYear: collectionYear,
    }
    setLoadingText("Running validation...")
    let [newValidatedData, pythonErrors] = await handleUploaded903Data(fileContents, selectedErrors, metadata);
    if (pythonErrors.length === 0) {
      setValidatedData(newValidatedData);
    } else {
      clearAndRestart();
      setUploadErrors(pythonErrors)
    }
    setLoadingText("");
  }, [fileContents, selectedErrors, clearAndRestart, localAuthority, collectionYear])

  const downloadCSVs = useCallback( async () => {
    event('click', 'download')
    if (validatedData) {
        await saveErrorSummary('ErrorCounts');
        await saveErrorSummary('ChildErrorSummary');
    }


  }, [validatedData])

  const downloadLoadedCSVs = useCallback( async () => {
    event('click', 'download')
    if (validatedData) {
        await saveLoadedFiles('Header');
        await saveLoadedFiles('Episodes');
        await saveLoadedFiles('UASC');
        await saveLoadedFiles('OC2');
        await saveLoadedFiles('OC3');
        await saveLoadedFiles('AD1');
        await saveLoadedFiles('Missing');
        await saveLoadedFiles('Reviews');
        await saveLoadedFiles('PlacedAdoption');
        await saveLoadedFiles('PrevPerm');
    }


  }, [validatedData])

  const toggleErrorSelection = useCallback(toggledError => {
    let newSelectedErrors: Array<ErrorSelected> = [];
    for (let error of selectedErrors) {
      let errorCopy = { ...error }
      if (errorCopy.code === toggledError.code) {
        errorCopy.selected = !errorCopy.selected;
      }
      newSelectedErrors.push(errorCopy);
    }

    setSelectedErrors(newSelectedErrors);
  }, [selectedErrors, setSelectedErrors])

  const setAllErrors = useCallback(newState => {
    let newSelectedErrors: Array<ErrorSelected> = [];
    for (let error of selectedErrors) {
      let errorCopy = { ...error }
      errorCopy.selected = newState;
      newSelectedErrors.push(errorCopy);
    }

    setSelectedErrors(newSelectedErrors);
  }, [selectedErrors, setSelectedErrors])

  useEffect(() => {
    let storedValue = window.localStorage.getItem('localAuthority');

    // Only set this if its present (i.e. fail if our LA list has changed)
    if (storedValue && laData.some(la => la.la_id === storedValue)) {
      const la = laData.find(la => la.la_id === storedValue);
      event('la_select', 'localStore', la?.la_name || storedValue);
      setLocalAuthority(storedValue);
    }
  }, [setLocalAuthority])

  const changeLocalAuthority = useCallback(ev => {
    const la = laData.find(la => la.la_id === ev.target.value);
    event('la_select', 'user', la?.la_name || ev.target.value);
    setLocalAuthority(ev.target.value);
    window.localStorage.setItem('localAuthority', ev.target.value);
  }, [setLocalAuthority]);


  return (
    <>
    {validatedData
      ? <Validator validatedData={validatedData} />
      : <>
        <Uploader currentFiles={fileContents} addFileContent={addFileContent} uploadErrors={uploadErrors} selectedErrors={selectedErrors} setSelectedErrors={setSelectedErrors}/>
        <GovUK.Select input={{value: collectionYear, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCollectionYear(e.target.value)}} label='Collection Year' mb={4}>
          {collectionYears.map(collectionYear => <option key={collectionYear} value={collectionYear}>{collectionYear}</option>)}
        </GovUK.Select>

        <GovUK.Select input={{value: localAuthority ? localAuthority : undefined, onChange: changeLocalAuthority}} label='Local Authority' mb={4}>
          {laData.map(({la_id, la_name}) => <option key={la_id} value={la_id}>{la_name}</option>)}
        </GovUK.Select>
        <GovUK.Paragraph>
          We ask you to select your Local Authority to enable proper postcode validation within the tool, and to allow us to count how many distinct LAs have used the tool. We never name LAs in this aggregate reporting.
        </GovUK.Paragraph>

      </>
    }

    <LoadingBox loading={loadingText}>
      <GovUK.Details summary={`Validation Rules (${selectedErrors.filter(e => e.selected).length} selected, ${selectedErrors.filter(e => !e.selected).length} unselected)`}>
        <GovUK.Button onClick={() => setAllErrors(true)}>Select All </GovUK.Button> <GovUK.Button onClick={() => setAllErrors(false)}>Deselect All </GovUK.Button>
        {selectedErrors.map(error => <GovUK.Checkbox key={error.code} checked={error.selected} onChange={() => toggleErrorSelection(error)}>{error.code} - {error.description}</GovUK.Checkbox>)}
      </GovUK.Details>



      <div style={{marginRight: '10%', display: 'inline'}}>
        <GovUK.Button onClick={runValidation}>Validate</GovUK.Button>
      </div>
      <div style={{marginRight: '10%', display: 'inline'}}>
        <GovUK.Button onClick={clearAndRestart}>Clear Data and Start Again</GovUK.Button>
      </div>
      <div style={{marginRight: '10%', display: 'inline'}}>
        {validatedData
          ? <GovUK.Button onClick={downloadCSVs}>Download Error Reports</GovUK.Button>
          : <GovUK.Button buttonColour='gray' disabled>Download Error Reports</GovUK.Button>
        }
      </div>
      <div style={{marginRight: '10%', display: 'inline'}}>
        {validatedData
          ? <GovUK.Button onClick={downloadLoadedCSVs}>Download 903 CSVs</GovUK.Button>
          : <GovUK.Button buttonColour='gray' disabled>Download 903 CSVs</GovUK.Button>
        }
      </div>
    </LoadingBox>
    </>
  )
}

function LoadingBox({children, loading}: any) {
  if (loading) {
    return (
      <div style={{ position: 'relative', pointerEvents: 'none'}}>
        <div style={{width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
          <div style={{width: '100%', textAlign: 'center', height: '25px', fontSize: '24px'}}>{loading}</div>
          <Spinner style={{width: '50px', height: '50px', display: 'block'}} />
        </div>
        <div style={{opacity: '30%'}}>
          {children}
        </div>
      </div>
    )
  } else {
    return children
  }
}

function getCollectionYears(num_years: number): Array<string> {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear()
  if (currentDate.getMonth() < 4) {
    currentYear = currentYear - 1
  }
  let years = [currentYear]
  for (let i = 1; i < num_years; i++) {
    years.push(currentYear - i)
  }

  return years.map(year => `${year}/${(year + 1) % 100}`)
}