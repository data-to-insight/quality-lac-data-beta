import pythonAPI from './python/api.py'
import { ValidatedData, UploadedFile } from './types';

export async function handleUploaded903Data(uploadedFiles: Array<UploadedFile>): Promise<[ValidatedData, Array<any>]> {
    const pyodide = window.pyodide;

    console.log('Passing uploaded data to Pyodide...')
    pyodide.globals.set("uploaded_files", uploadedFiles)

    const script = await (await fetch(pythonAPI)).text();
    let uploadErrors = [];
    try {
        pyodide.runPython(script);
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