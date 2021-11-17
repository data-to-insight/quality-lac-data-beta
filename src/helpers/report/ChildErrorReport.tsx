import {childColumnName} from "../../config";
import {ValidatedData} from "../../types";
import {saveAs} from "file-saver";

interface ChildReport {
    childSummaryRows: string[][],
    errorCountRows: string[][],
}

export const generateReport = (validatedData: ValidatedData): ChildReport => {
    let childSummaryRows = [["ChildID", "ErrorCode", "ErrorDescription", "ErrorFields"]];
    let errorCountRows = [['ErrorCode', 'ErrorDescription', 'NumErrors']];
    let errorCounts = new Map();
    validatedData?.data.forEach((table, tableName) => {
        let errors = validatedData.errors.get(tableName);
        table.forEach(dataRow => {
            let index = dataRow.get('Index') as number;
            let child = dataRow.get(childColumnName) as string;
            let errorList = errors?.get(index);
            errorList?.forEach(errorCode => {
                let errorDefn = validatedData.errorDefinitions.get(errorCode) as Map<string, any>;
                let errorFields = errorDefn?.get('affected_fields')?.toString();
                childSummaryRows.push([`"${child}"`, `"${errorCode}"`, `"${errorDefn?.get("description") as string}"`,
                    `"${errorFields as string}"`]);

                errorCounts.set(errorCode, errorCounts.has(errorCode) ? errorCounts.get(errorCode) + 1 : 1)
            })
        })
    })

    errorCounts.forEach((numErrors, errorCode) => {
        errorCountRows.push([`"${errorCode}"`, `"${validatedData?.errorDefinitions.get(errorCode)?.get('description')}"`, `${numErrors}`]);
    })

    return {childSummaryRows, errorCountRows}
}

export const saveChildSummary = ({childSummaryRows}: ChildReport) => {
    const childErrorContent = new Blob([childSummaryRows.map(r => r.join(",")).join('\n')], {type: 'text/csv'});
    saveAs(childErrorContent, 'ChildErrorSummary.csv');
}

export const saveErrorSummary = ({errorCountRows}: ChildReport) => {
    let errorSummaryContent = new Blob([errorCountRows.map(r => r.join(",")).join('\n')], {type: 'text/csv'});
    saveAs(errorSummaryContent, 'ErrorCounts.csv');
}
