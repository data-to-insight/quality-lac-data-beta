export type FilesCallback = (arg: UploadedFiles) => void;
export type DataRow = Map<string, any>
export type ParsedData = Map<String, Array<DataRow>>

type UploadedFiles = {description: string, acceptedFiles: Array<File>};

declare global {
    interface Window {
        pyodide: any,
        loadPyodide: any,
    }
}