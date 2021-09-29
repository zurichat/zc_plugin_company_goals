import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const generateEXCEL = (document) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const tableRows = [];
  // for each ticket pass all its data into an array
  document.forEach((ticket, i) => {
    const ticketData = {
      No: `${i + 1}`,
      'Goal Name': `${ticket.goal_name}`,
      'Goal Type': ticket.goal_type,
      Category: ticket.category,
      Description: ticket.description,
      'Start Date': ticket.start_date,
      'Due Date': ticket.due_date,
    };
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });
  console.log(tableRows);
  const ws = XLSX.utils.json_to_sheet(tableRows);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const excelData = new Blob([excelBuffer], { type: fileType });
  //generate file name
  const date = Date().split(' ');
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  FileSaver.saveAs(excelData, `Goals_Report_${dateStr}` + fileExtension);
};

export default generateEXCEL;
