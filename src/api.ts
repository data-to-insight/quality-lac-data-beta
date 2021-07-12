import libraryWheel from './python/903_Validator-0.1.0-py3-none-any.whl'
import { ValidatedData, UploadedFile } from './types';

export async function handleUploaded903Data(uploadedFiles: Array<UploadedFile>): Promise<[ValidatedData, Array<any>]> {
  const pyodide = window.pyodide;

  console.log('Passing uploaded data to Pyodide...')
  pyodide.globals.set("uploaded_files", uploadedFiles)

  let uploadErrors = [];
  try {
      await pyodide.runPythonAsync(`
        js_files, errors, error_definitions = run_validation_for_javascript(uploaded_files.to_py())
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

    window.pyodide.globals.set("validator_library_path", libraryWheel)
    await window.pyodide.runPythonAsync(`
      import micropip
      await micropip.install(validator_library_path)
      from validator903 import run_validation_for_javascript
    `)
    console.log('Loaded custom libary.')
  } else {
    console.log('Pyodide already loaded.');
  }
}