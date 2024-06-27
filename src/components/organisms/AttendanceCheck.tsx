import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import AttendanceTable, { Attendance } from "../atom/AttendanceTable";
import SelectComponent from "../atom/Select";
import Select from "../atom/Select";

type DateOption = {
  dateId: number;
  date: string;
};

export type ClassOption = {
  classNum: number;
  className: string;
};

const AttendanceCheck = () => {
  const [dates, setDates] = useState<DateOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  //
  const [classNum, setClassNum] = useState<string>("");
  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassNum(event.target.value);
  };
  //

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

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>출결 확인</h1>
      <Select
        options={dates.map((date) => ({
          id: date.dateId,
          value: date.date,
          text: date.date,
        }))}
        onChange={(e) => setSelectedDate(e.target.value)}
        defaultOption="날짜 선택"
      />

      <Select
        options={classes.map((cls) => ({
          id: cls.classNum,
          value: cls.classNum,
          text: cls.className,
        }))}
        onChange={handleClassChange}
        defaultOption="수업 선택"
      />
      {selectedDate && classNum && (
        <AttendanceTable attendanceData={attendanceData} />
      )}
    </div>
  );
};

export default AttendanceCheck;
