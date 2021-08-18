import libraryWheel from './python/903_Validator-0.1.0-py3-none-any.whl'
import { ValidatedData, UploadedFile, ErrorSelected, UploadMetadata } from './types';

export async function handleUploaded903Data(uploadedFiles: Array<UploadedFile>, selectedErrors: Array<ErrorSelected>, metadata: UploadMetadata): Promise<[ValidatedData, Array<any>]> {
  const pyodide = window.pyodide;

  console.log('Passing uploaded data to Pyodide...');
  pyodide.globals.set("uploaded_files", uploadedFiles);
  pyodide.globals.set("error_codes", selectedErrors.filter(e => e.selected).map(({ code }) => code));
  pyodide.globals.set("metadata", metadata);

  let uploadErrors = [];
  try {
      await pyodide.runPythonAsync(`
        js_files, errors, error_definitions = run_validation_for_javascript(uploaded_files.to_py(), error_codes=error_codes.to_py(), metadata=metadata.to_py())
      `);
  } catch (error) {
      console.log('Caught Error!')
      console.log(error.toString());
      // We need to take the second to last line to get the exception text.
      const errorLines = error.toString().split('\n')
      uploadErrors.push(errorLines[errorLines.length - 2]);
  }

  const data = pyodide.globals.get("js_files")?.toJs();
  const errors = pyodide.globals.get("errors")?.toJs();
  const errorDefinitions = pyodide.globals.get("error_definitions")?.toJs();

  console.log('Python calculation complete.')

  return [{ data, errors, errorDefinitions }, uploadErrors]
}

export async function loadPyodide() {
  if (!window.pyodide.runPython) {
    await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/" });
    await window.pyodide.loadPackage(['pandas']);
    console.log('Loaded pyodide, now loading custom library...');

    window.pyodide.globals.set("validator_library_path", libraryWheel);
    await window.pyodide.runPythonAsync(`
      import micropip
      await micropip.install(validator_library_path)
      from validator903 import *
    `);
    console.log('Loaded custom libary.');
  } else {
    console.log('Pyodide already loaded.');
  }
}

export async function loadErrorDefinitions(): Promise<Array<ErrorSelected>> {
  const pyodide = window.pyodide;
  await pyodide.runPythonAsync(`
    all_error_definitions = get_error_definitions_list()
  `);

  let errorDefinitionsPy: any = window.pyodide.globals.get("all_error_definitions");

  let errorDefinitions: Array<ErrorSelected> = [];
  for (let error of errorDefinitionsPy) {
    errorDefinitions.push({
      code: error.code,
      description: error.description,
      affectedFields: error.affected_fields,
      selected: true,
    })
  }
  return errorDefinitions
}