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
        from validator903.validator import Validator
        from validator903.report import Report
        from validator903.config import errors as configured_errors
        from dataclasses import asdict
        
        import os
        os.environ['QLAC_DISABLE_PC'] = 'True'

        validator = Validator(metadata.to_py(), uploaded_files.to_py())
        result = validator.validate(error_codes.to_py())
        print("Finished Validating")
        
        report = Report(result)
        print("Created report")
        
        cr = report.child_report
        print("Child report generated")
        
        js_files = {k: [t._asdict() for t in df.itertuples(index=True)] for k, df in validator.dfs.items()}
        
        error_definitions = {code: asdict(definition[0]) for code, definition in configured_errors.items()}

        errors = {}
        for row in report.child_report.itertuples():
            errors.setdefault(row.Table, {}).setdefault(row.RowID, []).append(row.Code)
                
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
  if (!window.pyodide?.runPython) {
    window.pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/" });
    await window.pyodide.loadPackage(['micropip']);
    console.log('Loaded pyodide, now loading custom library...');

    await window.pyodide.runPythonAsync(`
      import logging
      logging.basicConfig(level=logging.DEBUG)
      
      import micropip
      await micropip.install('quality-lac-data-validator')
    `);
    console.log('Loaded custom libary.');
  } else {
    console.log('Pyodide already loaded.');
  }
}

export async function loadErrorDefinitions(): Promise<Array<ErrorSelected>> {
  const pyodide = window.pyodide;
  await pyodide.runPythonAsync(`
    from validator903.config import errors as configured_errors
    all_error_definitions = [definition[0] for definition in configured_errors.values()]
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