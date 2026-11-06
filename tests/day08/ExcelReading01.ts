
//we have generated this code with help of Agantic AI by giving prompt
//even though red line error code will run will get O/P in tabular form
import ExcelJS from 'exceljs';//it uses all library from exeljs
import path from 'node:path';//importing path>> path helping me here is my excel file is present

async function printExcelData(): Promise<void> {
    const filePath = path.resolve(__dirname, '../../src/testData/TestData.xlsx');//giving file path in automated way

    //workbook is var>store entire info of file >>it read all Workbook
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

    const rows: Record<string, string>[] = [];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1 || !row.hasValues) {
            return;
        }

        const values: Record<string, string> = {};
        headers.forEach((header, index) => {
            values[header] = row.getCell(index + 1).text;
        });
        rows.push(values);
    });

    console.table(rows);
}

printExcelData().catch((error: unknown) => {
    console.error('Could not read test data from the Excel workbook:', error);
    process.exitCode = 1;
});

//
//cmd >>npx tsx tests/day08/ExcelReading.ts