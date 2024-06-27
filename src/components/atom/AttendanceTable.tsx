import React from "react";

export interface Attendance {
  studentName: string;
  date: string;
  status: string;
  classNum: string;
  className: string;
}

interface AttendanceTableProps {
  attendanceData: Attendance[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceData,
}) => {
  const tableStyle: React.CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };

  const attendTableStyle: React.CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    border: "1px solid black",
  };

  const attendContentStyle: React.CSSProperties = {
    border: "1px solid black",
    textAlign: "center",
    padding: "8px",
  };

  return (
    <table style={tableStyle}>
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
            <td style={attendContentStyle}>{record.date}</td>
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
