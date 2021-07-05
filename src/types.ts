export type FilesCallback = (arg: UploadedFiles) => void;

export type DataRow = Map<string, any>;
export type ParsedData = Map<string, Array<DataRow>>;

export type ErrorCode = string;

export type ErrorDefinitions = Map<ErrorCode, Map<String, any>>;
export type ErrorIncidences = Map<string, Map<number, Array<ErrorCode>>>;

type UploadedFiles = {description: string, acceptedFiles: Array<File>};

declare global {
    interface Window {
        pyodide: any,
        loadPyodide: any,
    }
}