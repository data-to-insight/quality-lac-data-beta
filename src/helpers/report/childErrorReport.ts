import {saveAs} from "file-saver";
import dayjs from "dayjs";
import {captureException} from "../sentry";

export const saveErrorSummary = async (report_type: string) => {
    const time = dayjs().format('YYYYMMDD-HHmmss')
    const report_name = report_type === "ChildErrorSummary" ? 'children' : 'errors';
    const pyodide = window.pyodide;
    try {
        const report = pyodide.globals.get("report");
        const report_data = report.csv_report(report_name);
        let errorSummaryContent = new Blob([report_data],
            {type: 'text/csv'});
        report.destroy()
        saveAs(errorSummaryContent, `${report_type}-${time}.csv`);
    } catch (error) {
        console.error('Caught Error!', error)
        const pythonError = (error as Error).toString()
        captureException(error, {pythonError})
    }
}

export const saveExcelSummary = async () => {
    const time = dayjs().format('YYYYMMDD-HHmmss')
    const pyodide = window.pyodide;
    try {
        const report = pyodide.globals.get("report");
        const report_data = report.excel_report()
        let errorSummaryContent = new Blob([report_data.toJs],
            {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        report.destroy()
        report_data.destroy()
        saveAs(errorSummaryContent, `ErrorReport-${time}.xlsx`);
    } catch (error) {
        console.error('Caught Error!', error)
        const pythonError = (error as Error).toString()
        captureException(error, {pythonError})
    }
}

export const saveLoadedFiles = async (table_name: string) => {
    const time = dayjs().format('YYYYMMDD-HHmmss')
    const pyodide = window.pyodide;
    try {
        const csv_string_dict = pyodide.globals.get('csv_string_dict').toJs();
        const csv_string = csv_string_dict.get(table_name);
        let csvDownloadContent = new Blob([csv_string],
            {type: 'text/csv'});
        saveAs(csvDownloadContent, `${table_name}-${time}.csv`);
    } catch (error) {
        console.error('Caught Error!', error)
        const pythonError = (error as Error).toString()
        captureException(error, {pythonError})
    }
}
