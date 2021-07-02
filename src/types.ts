export type FilesCallback = (arg: UploadedFiles) => void;

type UploadedFiles = {description: string, acceptedFiles: Array<File>};

declare global {
    interface Window {
        pyodide: any,
        loadPyodide: any,
    }
}