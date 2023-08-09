import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Table } from 'react-bootstrap';
import './css/empReport.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { readFile } from 'xlsx';


function EmpReportTable() {
  const [eid, setEid] = useState('');
  const [reports, setReports] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/employee/empReport/${eid}`);
      setReports([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/employee/empReport');
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  

const handleDownload = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/employee/empReport/${eid}`);
    const reports = response.data;
    
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(reports);
    
    // Add column headers to the worksheet
    const headers = ["Report ID", "Employee ID", "Name", "Total work Time(hrs)", "Total work Days"];
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
    
    // Format the column widths
    const columnWidths = [10, 15, 20, 25, 20];
    ws["!cols"] = columnWidths.map(width => ({ width }));
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Employee Report");
    
    // Save the workbook as a file
    const filename = 'report.xlsx';
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), filename);
  } catch (error) {
    console.error(error);
  }
};

// Convert a string to an ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-center">
            <div className="w-75">
              <h1 className="text-center mb-4">Employee Report</h1>
            </div>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover responsive className="table table-bordered table-hover shadow rounded">
              <thead className="thead-gradient-blue rounded-top">
                <tr>
                  <th>Report ID</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Total work Time(hrs)</th>
                  <th>Total work Days</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>{report._id}</td>
                    <td>{report.eid}</td>
                    <td>{report.name}</td>
                    <td>{report.totalWorkTime ? report.totalWorkTime.toFixed(3) : ''}</td>

                    <td>{report.totalWorkDays}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center">
            <form className="w-50 mt-4" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee ID"
                  value={eid}
                  onChange={(e) => setEid(e.target.value)}
                />
                <div className="input-group-append">
                  <button id='generate' type="submit" className="btn btn-primary">
                    Generate Report
                  </button>
                  
                </div>
                <button id='download' className="btn btn-primary" onClick={handleDownload}>Download Report</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpReportTable;
