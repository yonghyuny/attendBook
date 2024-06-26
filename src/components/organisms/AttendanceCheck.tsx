import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import AttendanceTable, { Attendance } from "../atom/AttendanceTable";

interface DateOption {
  dateId: number;
  date: string;
}

const AttendanceCheck: React.FC = () => {
  const [dates, setDates] = useState<DateOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      const response = await axios.get("http://localhost:3001/dates");
      setDates(response.data);
    };
    fetchDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const fetchAttendance = async () => {
        const response = await axios.get(
          `http://localhost:3001/attendancecheck?date=${selectedDate}`
        );
        setAttendanceData(response.data);
      };
      fetchAttendance();
    }
  }, [selectedDate]);

  const divStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };
  const h1Style: CSSProperties = {
    width: "100%",
    textAlign: "center",
  };

  const selectStyle: CSSProperties = {
    width: "100px",
    height: "40px",
  };

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>출결 확인</h1>
      <select
        style={selectStyle}
        onChange={(e) => setSelectedDate(e.target.value)}
        defaultValue=""
      >
        <option value="">날짜 선택</option>
        {dates.map((date) => (
          <option key={date.dateId} value={date.date}>
            {date.date}
          </option>
        ))}
      </select>
      {selectedDate && <AttendanceTable attendanceData={attendanceData} />}
    </div>
  );
};

export default AttendanceCheck;
