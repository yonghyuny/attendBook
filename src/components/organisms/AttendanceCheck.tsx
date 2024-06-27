import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import AttendanceTable, { Attendance } from "../atom/AttendanceTable";

interface DateOption {
  dateId: number;
  date: string;
}

interface ClassOption {
  classNum: number;
  className: string;
}
// sdf
const AttendanceCheck: React.FC = () => {
  const [dates, setDates] = useState<DateOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      const response = await axios.get("http://localhost:3001/dates");
      setDates(response.data);
    };
    fetchDates();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get("http://localhost:3001/classes");
      setClasses(response.data);
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedClass) {
      const fetchAttendance = async () => {
        const response = await axios.get(
          `http://localhost:3001/attendancecheck?date=${selectedDate}&classNum=${selectedClass}`
        );
        setAttendanceData(response.data);
      };
      fetchAttendance();
    }
  }, [selectedDate, selectedClass]);

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
  const selectGroupStyle: CSSProperties = {
    display: "flex",
    gap: "15px",
  };

  return (
    <div>
      <div style={divStyle}>
        <h1 style={h1Style}>출결 확인</h1>
        <div style={selectGroupStyle}>
          <div>
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
          </div>
          <div>
            <select
              style={selectStyle}
              onChange={(e) => setSelectedClass(parseInt(e.target.value, 10))}
              defaultValue=""
            >
              <option value="">수업 선택</option>
              {classes.map((cls) => (
                <option key={cls.classNum} value={cls.classNum}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedDate && selectedClass && (
          <AttendanceTable attendanceData={attendanceData} />
        )}
      </div>
    </div>
  );
};

export default AttendanceCheck;
