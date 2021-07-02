
export default function handleUploaded903Data(uploadedFiles) {
    const pyodide = window.pyodide;

    console.log('Passing uploaded data to Pyodide...')
    pyodide.globals.set("uploaded_files", uploadedFiles)
    pyodide.runPython(`
    import pandas as pd
    from io import StringIO

    def get_file_type(df):
        if 'UPN' in df.columns:
            return 'HEADER'
        elif 'DECOM' in df.columns:
            return 'EPISODE'

    files = {}

    for file_name, file in uploaded_files.to_py().items():
        csv_file = StringIO(file)
        df = pd.read_csv(csv_file)

        files[get_file_type(df)] = [t._asdict() for t in df.itertuples()]
    `)

    return pyodide.globals.get("files").toJs()
}
