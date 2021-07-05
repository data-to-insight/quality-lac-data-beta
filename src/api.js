import pythonAPI from './python/api.py'

export async function handleUploaded903Data(uploadedFiles) {
    const pyodide = window.pyodide;

    console.log('Passing uploaded data to Pyodide...')
    pyodide.globals.set("uploaded_files", uploadedFiles)

    const script = await (await fetch(pythonAPI)).text();
    pyodide.runPython(script)

    return pyodide.globals.get("js_files").toJs()
}

export function get903Errors(df) {

}