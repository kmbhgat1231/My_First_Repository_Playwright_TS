import ExcelJS from 'exceljs';
import path from 'node:path';

async function printExcelData(): Promise<void> {
    const filePath = path.resolve(__dirname, '../../src/testData/TestData.xlsx');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('LoginTestData');
    if (!worksheet) {
        throw new Error('Worksheet "LoginTestData" was not found in TestData.xlsx.');
    }

    const headerRow = worksheet.getRow(1);
    const headers = Array.from(
        { length: headerRow.cellCount },
        (_, index) => headerRow.getCell(index + 1).text.trim()
    );
    if (headers.length === 0 || headers.some((header) => header.length === 0)) {
        throw new Error('The worksheet must have a non-empty header in every column.');
    }

    const data: Record<string, string>[] = [];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1 || !row.hasValues) {
            return;
        }

        const values: Record<string, string> = {};
        headers.forEach((header, index) => {
            values[header] = row.getCell(index + 1).text;
        });
        data.push(values);
    });

    console.table(data);
}

printExcelData().catch((error: unknown) => {
    console.error('Could not read test data from the Excel workbook:', error);
    process.exitCode = 1;
});