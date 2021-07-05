import pythonAPI from './python/api.py'

export async function handleUploaded903Data(uploadedFiles) {
    const pyodide = window.pyodide;

    console.log('Passing uploaded data to Pyodide...')
    pyodide.globals.set("uploaded_files", uploadedFiles)

    const script = await (await fetch(pythonAPI)).text();
    pyodide.runPython(script);

    const data = pyodide.globals.get("js_files").toJs();
    const errors = pyodide.globals.get("errors");
    const errorDefinitions = pyodide.globals.get("error_definitions");

    console.log('Python calculation complete.')

    return { data, errors, errorDefinitions }
}