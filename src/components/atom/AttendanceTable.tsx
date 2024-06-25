import React, { useEffect, useState } from "react";
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

  return (
    <table>
      <thead>
        <tr>
          <th>날짜</th>
          <th>반이름</th>
          <th>학생이름</th>
          <th>출결상태</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((record, index) => (
          <tr key={index}>
            <td>{record.date.replace(/T.*$/, "")}</td>
            <td>{record.className}</td>
            <td>{record.studentName}</td>
            <td>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
