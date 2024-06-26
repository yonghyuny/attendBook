import React, { CSSProperties, useEffect, useState } from "react";
import axios from "axios";

interface Attendance {
  studentName: string;
  date: string;
  status: string;
  className: string;
}

const fetchAttendance = async (): Promise<Attendance[]> => {
  const response = await axios.get("http://localhost:3001/attendancecheck");
  return response.data;
};

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAttendance();
      setAttendanceData(data);
    };
    getData();
  }, []);

  const tableStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };
  const attendTableStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    border: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const attendContentStyle: CSSProperties = {
    width: "400px",
    borderRight: "1px solid black",
    textAlign: "center",
  };
  return (
    <table style={tableStyle}>
      ///
      <thead>
        <tr style={attendTableStyle}>
          <th style={attendContentStyle}>날짜</th>
          <th style={attendContentStyle}>반이름</th>
          <th style={attendContentStyle}>학생이름</th>
          <th style={attendContentStyle}>출결상태</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((record, index) => (
          <tr key={index} style={attendTableStyle}>
            <td style={attendContentStyle}>
              {record.date.replace(/T.*$/, "")}
            </td>
            <td style={attendContentStyle}>{record.className}</td>
            <td style={attendContentStyle}>{record.studentName}</td>
            <td style={attendContentStyle}>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
