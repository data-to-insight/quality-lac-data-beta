export type FilesCallback = (arg: UploadedFiles) => void;
type UploadedFiles = {description: string, acceptedFiles: Array<File>};

/** Used for individual data rows */
export type DataRow = Map<string, Object>;

/** Type that maps file types (e.g. Header, Episodes) to the data (arrays of DataRows) */
export type ParsedData = Map<string, Array<DataRow>>;

export type ErrorCode = string;
export type ErrorDefinition = Map<String, unknown>
export type ErrorDefinitions = Map<ErrorCode, ErrorDefinition>;

/** Error incidences are described by table name -> row index -> list of error codes */
export type ErrorIncidences = Map<string, Map<number, Array<ErrorCode>>>;

/** This type contains all the information from a successful validation in Python */
export type ValidatedData = {
    data: ParsedData,
    errors: ErrorIncidences,
    errorDefinitions: ErrorDefinitions,
}

declare global {
    interface Window {
        pyodide: any,
        loadPyodide: any,
    }
};